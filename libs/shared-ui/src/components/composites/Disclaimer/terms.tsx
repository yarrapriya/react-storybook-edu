import { Box, Typography } from '@mui/material';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {

};

export const Terms = () => {
  return <Box>
    {points.map(point => {
      return <Box sx={{ marginBottom: '20px' }}>
        <Typography variant='h2' sx={{ marginBottom: '8px' }}>
          {point.key}
        </Typography>
        <Typography variant='bodyText' sx={{ whiteSpace: 'pre-line' }}>
          {point.value}
        </Typography>
      </Box>
    })}
  </Box>
};


const points = [
  {
    key: "1. Terms",
    value: "By accessing the website at https://www.geneo.in/, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law."
  },
  {
    key: "2. Use License",
    value: "Permission is granted to temporarily download one copy of the materials (information or software) on Schoolnet India Limited (Schoolnet)'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:\n\nmodify or copy the materials;\nuse the materials for any commercial purpose, or for any public display (commercial or non-commercial);\nattempt to decompile or reverse engineer any software contained on Schoolnet India Limited (Schoolnet)'s website;\nremove any copyright or other proprietary notations from the materials; or\ntransfer the materials to another person or \"mirror\" the materials on any other server.\n\nThis license shall automatically terminate if you violate any of these restrictions and may be terminated by Schoolnet India Limited (Schoolnet) at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format."
  },
  {
    key: "3. Disclaimer",
    value: "The materials on Schoolnet India Limited (Schoolnet)'s website are provided on an 'as is' basis. Schoolnet India Limited (Schoolnet) makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.\nFurther, Schoolnet India Limited (Schoolnet) does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site."
  },
  {
    key: "4. Limitations",
    value: "In no event shall Schoolnet India Limited (Schoolnet) or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Schoolnet India Limited (Schoolnet)'s website, even if Schoolnet India Limited (Schoolnet) or a Schoolnet India Limited (Schoolnet) authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you."
  },
  {
    key: "5. Accuracy of materials",
    value: "The materials appearing on Schoolnet India Limited (Schoolnet) website could include technical, typographical, or photographic errors. Schoolnet India Limited (Schoolnet) does not warrant that any of the materials on its website are accurate, complete or current. Schoolnet India Limited (Schoolnet) may make changes to the materials contained on its website at any time without notice. However Schoolnet India Limited (Schoolnet) does not make any commitment to update the materials."
  },
  {
    key: "6. Links",
    value: "Schoolnet India Limited (Schoolnet) has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Schoolnet India Limited (Schoolnet) of the site. Use of any such linked website is at the user's own risk."
  },
  {
    key: "7. Modifications",
    value: "Schoolnet India Limited (Schoolnet) may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service."
  },
  {
    key: "8. Governing Law",
    value: "These terms and conditions are governed by and construed in accordance with the laws of Delhi, India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.\n\nThis website (the 'Site') is designed and maintained by Schoolnet and may be used for personal information purposes only. Schoolnet owns and retains copyright on all text, graphics and trademarks displayed on the Site. You may download the downloadable material displayed on the Site, provided you retain all copyright and other proprietary notices contained on the materials."
  },
  {
    key: "WARRANTY AS TO INFORMATION",
    value: "All information and material in the Site are provided on an 'as is' basis and are without guarantees or warranties of any kind, express or implied as to its completeness, correctness, accuracy, reliability or otherwise. While the Site may be updated periodically, Schoolnet or its directors, employees or agents do not guarantee that the Site reflects the latest amendments/information at any time.\nFurthermore, any ideas and/or information provided or gained from the Site would not necessarily reflect the views of Schoolnet or its directors, employees or agents."
  },
  {
    key: "LIMITATION OF LIABILITY",
    value: "Under no circumstances shall Schoolnet, its subsidiaries or affiliates or its directors, employees or agents be liable for any direct or indirect loss of profit, incidental, special or consequential damages that are alleged to have resulted from the use and/or inability to use the Site, directly or indirectly, or any information contained within."
  },
  {
    key: "USE OF CONTENTS",
    value: "The contents of the Site shall not be reproduced, distributed, transmitted, modified, reused or published in whole or in part by the recipient hereof or any other person for any purpose without the prior written approval of Schoolnet.\nNo reproduction of any part of the Site may be sold or distributed for commercial gain, nor shall it be modified or incorporated in any other work, publication or site.\nSchoolnet makes no warranty that the contents of the site are free from infection by viruses or anything else which has contaminating or destructive properties.\nCertain links on the site lead to resources located on servers maintained by third parties over whom Schoolnet has no control. Schoolnet accepts no responsibility or liability for any of the material contained on those servers."
  },
  {
    key: "COPYRIGHT",
    value: "All materials contained herein are protected under the Copyright Act, 1957 and may not be reproduced, distributed, transmitted, displayed, published or broadcast without the prior written permission of Schoolnet India Limited (Schoolnet). You may not alter or remove any trademark, copyright or other notice from copies of the content. Unauthorized copying of any copyrighted materials without permission of the copyright owner is unlawful."
  },
  {
    key: "MATERIAL SUBMITTED BY USERS",
    value: "Certain elements of the site will contain material submitted by users. Schoolnet accepts no responsibility for the content or accuracy of such material. Users submitting their material to Schoolnet website will need to own the copyright and relevant legal permissions needed to publish such material online."
  },
  {
    key: "ADVERTISING MATERIAL",
    value: "Part of the site will contain advertising and other material submitted to Schoolnet by third parties. Advertisers are responsible for ensuring that material submitted for inclusion on the site complies with International and National law. Schoolnet will not be responsible for any advertiser's claim error, omission or inaccuracy in advertising material, and reserves the right to omit, suspend or change the position of any advertising material submitted for insertion. Acceptance of advertisement on the site will be subject to Schoolnet terms and conditions which are available on request."
  },
  {
    key: "DATA PROTECTION",
    value: "Schoolnet may send information and offers of products and services to you from time to time, unless you have indicated on the registration form that you do not wish to receive such material."
  },
  {
    key: "FORCE MAJEURE",
    value: "Schoolnet shall have no liability to you for any interruption or delay in access to the site irrespective of the cause."
  },
  {
    key: "JURISDICTION",
    value: "The Agreement will be governed by Indian Law. The courts in Delhi shall have exclusive jurisdiction over any disputes arising under this agreement."
  }
]
