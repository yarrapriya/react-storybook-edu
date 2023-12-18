import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {
  CellContent,
  TableDataModel,
} from '@protos/content_management/content.db_pb';
import { getMediaBasePath } from '../../../../commonUtils/images';
import { pxToRem } from '../../../../commonUtils/resizeUtils';
import { IStyles } from '../../../../commonUtils/styleUtils';
import ImageWrapper from '../../../elements/ImageWrapper';

const styles: IStyles = {
  table: {
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  tableBody: {
    '& tr :first-of-type': {
      '& td :first-of-type': {
        borderTopLeftRadius: '15px',
      },
      '& td:last-child': {
        borderTopRightRadius: '15px',
      },
    },
    '& tr:last-child': {
      '& td :first-of-type': {
        borderBottomLeftRadius: '15px',
      },
      '& td:last-child': {
        borderBottomRightRadius: '15px',
      },
    },
  },
  tableCell: {
    borderBottom: 'unset',
    backgroundColor: 'common.white',
    '&:not(:last-child)': {
      borderRight: '1px solid #E9E9E9',
    },
    fontFamily: 'Lato',
    color: '#1D1D1D',
    fontWeight: '400',
    fontSize: {
      xs: pxToRem(16),
      md: pxToRem(24),
    },
  },
  tableCellHeader: {
    borderBottom: 'unset',
    backgroundColor: '#DAEEF6',
    '&:not(:last-child)': {
      borderRight: '1px solid #92DCF9',
    },
    fontFamily: 'Lato',
    color: '#1D1D1D',
    fontWeight: '800',
    fontSize: {
      xs: pxToRem(22),
      md: pxToRem(30),
    },
    textAlign: 'center',
  },
  tableCellFooter: {
    borderBottom: 'unset',
    backgroundColor: '#DAEEF6',
    '&:not(:last-child)': {
      borderRight: '1px solid #E9E9E9',
    },
    fontFamily: 'Lato',
    color: '#1D1D1D',
    fontWeight: '400',
    fontSize: {
      xs: pxToRem(16),
      md: pxToRem(24),
    },
  },
};

interface IProps {
  table: TableDataModel;
}

const getArrayFromTableContent = (content: CellContent[]) => {
  const array: CellContent[][] = [];
  content.forEach((con) => {
    // console.log(con);
    if (!Array.isArray(array[con.row])) {
      array[con.row] = [];
    }
    array[con.row][con.column] = con;
  });
  return array;
};

const createArrayFromStartAndEndIndex = (
  startIndex: number,
  endIndex: number
) => {
  const arr = [];
  for (let i = startIndex; i <= endIndex; i++) {
    arr.push(i);
  }
  return arr;
};

export const TableElement = (props: IProps) => {
  const { table } = props;
  const { content, title, hasHeader, hasFooter, mergedCells } = table;
  const tableArray = getArrayFromTableContent(content);
  const rowStartIndex = 0;
  const rowEndIndex: number = tableArray.length - 1;
  const bodyRowIndexes: number[] = createArrayFromStartAndEndIndex(
    rowStartIndex,
    rowEndIndex
  );

  const isMergeCellStart = (rowIndex: number, colIndex: number) => {
    return mergedCells.some((mCell) => {
      const rowStart = mCell.start?.row;
      const colStart = mCell.start?.column;
      if (typeof rowStart === 'number' && typeof colStart === 'number') {
        return rowStart === rowIndex && colStart === colIndex;
      }
      return false;
    });
  };

  const getTableDimension = (
    rowIndex: number,
    colIndex: number
  ): { rowSpan: number; colSpan: number } => {
    const mIndex = mergedCells.findIndex((mCell) => {
      const rowStart = mCell.start?.row;
      const rowEnd = mCell.end?.row;
      const columnStart = mCell.start?.column;
      const columnEnd = mCell.end?.column;

      if (
        typeof rowStart === 'number' &&
        typeof rowEnd === 'number' &&
        typeof columnStart === 'number' &&
        typeof columnEnd === 'number'
      ) {
        return (
          rowIndex >= rowStart &&
          rowIndex <= rowEnd &&
          colIndex >= columnStart &&
          colIndex <= columnEnd
        );
      }
      return false;
    });

    if (mIndex === -1) {
      return { colSpan: 1, rowSpan: 1 };
    }

    const mCell = mergedCells[mIndex];
    if (isMergeCellStart(rowIndex, colIndex)) {
      return {
        rowSpan: 1 + (mCell.end?.row || 0) - (mCell.start?.row || 0),
        colSpan: 1 + (mCell.end?.column || 0) - (mCell.start?.column || 0),
      };
    }

    return { rowSpan: 1, colSpan: 1 };
  };

  const getTableCellFromValue = (val: CellContent) => {
    const isHeaderRow = hasHeader && val.row === 0;
    const isFooterRow = hasFooter && val.row === bodyRowIndexes.length - 1;
    const cellStyle = isHeaderRow
      ? styles.tableCellHeader
      : isFooterRow
      ? styles.tableCellFooter
      : styles.tableCell;
    if (val.textType) {
      return (
        <TableCell {...getTableDimension(val.row, val.column)} sx={cellStyle}>
          {val.textType.text}
        </TableCell>
      );
    }
    if (val.imageType) {
      return (
        <TableCell {...getTableDimension(val.row, val.column)} sx={cellStyle}>
          <ImageWrapper
            name={val.imageType.imageName}
            styles={{ width: '100%', minHeight: '40px' }}
            path={getMediaBasePath(
              val.imageType.imageUrl,
              'processedMediaBucket'
            )}
          />
        </TableCell>
      );
    }
    return (
      <TableCell {...getTableDimension(val.row, val.column)} sx={cellStyle} />
    );
  };

  return (
    <>
      {title && <Typography variant="elementH1">{title}</Typography>}
      <Table sx={styles.table}>
        <TableBody sx={styles.tableBody}>
          {bodyRowIndexes.map((row, i) => {
            return (
              <TableRow key={i}>
                {tableArray[row]?.map((val) => getTableCellFromValue(val))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
