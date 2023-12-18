import { Box, Typography } from '@mui/material';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {};

export const DisclaimerComp = () => {
  return (
    <Box>
      {points.map((point, index) => {
        return (
          <Box key={index} sx={{ marginBottom: '20px' }}>
            <Typography variant="h2" sx={{ marginBottom: '8px' }}>
              {point.key}
            </Typography>
            <Typography variant="bodyText">{point.value}</Typography>
          </Box>
        );
      })}
    </Box>
  );
};

const points = [
  {
    key: 'Disclaimer',
    value:
      "This website (the 'Site') is designed and maintained by Schoolnet India Limited and may be used for personal information purposes only. Schoolnet India Limited (Schoolnet) owns and retains copyright on all text, graphics and trademarks displayed on the Site. You may download the downloadable material displayed on the Site, provided you retain all copyright and other proprietary notices contained on the materials.",
  },
  {
    key: 'Warranty as to information',
    value:
      "All information and material in the Site are provided on an 'as is' basis and are without guarantees or warranties of any kind, express or implied as to its completeness, correctness, accuracy, reliability or otherwise. While the Site may be updated periodically, Schoolnet or its directors, employees or agents do not guarantee that the Site reflects the latest amendments/information at any time. Furthermore, any ideas and/or information provided or gained from the Site would not necessarily reflect the views of Schoolnet or its directors, employees or agents.",
  },
  {
    key: 'Limitation of liability',
    value:
      'Under no circumstances shall Schoolnet, its subsidiaries or affiliates or its directors, employees or agents be liable for any direct or indirect loss of profit, incidental, special or consequential damages that are alleged to have resulted from the use and/or inability to use the Site, directly or indirectly, or any information contained within.',
  },
  {
    key: 'Use of contents',
    value:
      'The contents of the Site shall not be reproduced, distributed, transmitted, modified, reused or published in whole or in part by the recipient hereof or any other person for any purpose without the prior written approval of Schoolnet. No reproduction of any part of the Site may be sold or distributed for commercial gain, nor shall it be modified or incorporated in any other work, publication or site. Schoolnet makes no warranty that the contents of the site are free from infection by viruses or anything else which has contaminating or destructive properties. Certain links on the site lead to resources located on servers maintained by third parties over whom Schoolnet has no control. Schoolnet accepts no responsibility or liability for any of the material contained on those servers.',
  },
  {
    key: 'Copyright',
    value:
      'All materials contained herein are protected under the Copyright Act, 1957 and may not be reproduced, distributed, transmitted, displayed, published or broadcast without the prior written permission of Schoolnet India Limited (Schoolnet). You may not alter or remove any trademark, copyright or other notice from copies of the content. Unauthorized copying of any copyrighted materials without permission of the copyright owner is unlawful.',
  },
  {
    key: 'Material submitted by users',
    value:
      'Certain elements of the site will contain material submitted by users. Schoolnet accepts no responsibility for the content or accuracy of such material. Users submitting their material to Schoolnet website will need to own the copyright and relevant legal permissions needed to publish such material online.',
  },
  {
    key: 'Advertising material',
    value:
      "Part of the site will contain advertising and other material submitted to Schoolnet by third parties. Advertisers are responsible for ensuring that material submitted for inclusion on the site complies with International and National law. Schoolnet will not be responsible for any advertiser's claim error, omission or inaccuracy in advertising material, and reserves the right to omit, suspend or change the position of any advertising material submitted for insertion. Acceptance of advertisement on the site will be subject to Schoolnet terms and conditions which are available on request.",
  },
  {
    key: 'Data protection',
    value:
      'Schoolnet may send information and offers of products and services to you from time to time, unless you have indicated on the registration form that you do not wish to receive such material.',
  },
  {
    key: 'Force majeure',
    value:
      'Schoolnet shall have no liability to you for any interruption or delay in access to the site irrespective of the cause.',
  },
  {
    key: 'Jurisdiction',
    value:
      'The Agreement will be governed by Indian Law. The Indian courts will have exclusive jurisdiction over any disputes arising under this agreement.',
  },
];
