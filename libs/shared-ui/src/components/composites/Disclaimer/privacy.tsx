import { Box, Typography } from '@mui/material';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {

};

export const Privacy = () => {
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
    key: "Privacy Policy",
    value: "This privacy policy has been compiled to better serve those who are concerned with how their 'Personally Identifiable Information' (PII) is being used online. PII, as described in US privacy law and information security, is information that can be used on its own or with other information to identify, contact, or locate a single person, or to identify an individual in context. Please read our privacy policy carefully to get a clear understanding of how we collect, use, protect or otherwise handle your Personally Identifiable Information in accordance with our website."
  },
  {
    key: "What personal information do we collect from the people that visit our blog, website or app?",
    value: "When ordering or registering on our site, as appropriate, you may be asked to enter your name, email address, mailing address, phone number, credit card information, social security number or other details to help you with your experience."
  },
  {
    key: "When do we collect information?",
    value: "We collect information from you when you register on our site, place an order, subscribe to a newsletter, respond to a survey, fill out a form, Use Live Chat, Open a Support Ticket or enter information on our site.\n\nProvide us with feedback on our products or services"
  },
  {
    key: "How do we use your information?",
    value: "We may use the information we collect from you when you register, make a purchase, sign up for our newsletter, respond to a survey or marketing communication, surf the website, or use certain other site features in the following ways:\n\n\n• To personalize your experience and to allow us to deliver the type of content and product offerings in which you are most interested.\n• To improve our website in order to better serve you.\n• To allow us to better service you in responding to your customer service requests.\n• To administer a contest, promotion, survey or other site feature.\n• To quickly process your transactions.\n• To ask for ratings and reviews of services or products\n• To follow up with them after correspondence (live chat, email or phone inquiries)"
  },
  {
    key: "Do we use 'cookies'?",
    value: "Yes. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. For instance, we use cookies to help us remember and process the items in your shopping cart. They are also used to help us understand your preferences based on previous or current site activity, which enables us to provide you with improved services. We also use cookies to help us compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.\n\nWe use cookies to:\n• Help remember and process the items in the shopping cart.\n• Understand and save user's preferences for future visits.\n• Keep track of advertisements.\n• Compile aggregate data about site traffic and site interactions in order to offer better site experiences and tools in the future. We may also use trusted third-party services that track this information on our behalf.\n\nYou can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies. You do this through your browser settings. Since browser is a little different, look at your browser's Help Menu to learn the correct way to modify your cookies."
  },
  {
    key: "If users disable cookies in their browser:",
    value: "If you turn cookies off, Some of the features that make your site experience more efficient may not function properly.Some of the features that make your site experience more efficient and may not function properly."
  },
  {
    key: "Third-party disclosure",
    value: "We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential. We may also release information when it's release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property or safety.\n\nHowever, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses."
  },
  {
    key: "Third-party links",
    value: "Occasionally, at our discretion, we may include or offer third-party products or services on our website. These third-party sites have separate and independent privacy policies. We therefore have no responsibility or liability for the content and activities of these linked sites. Nonetheless, we seek to protect the integrity of our site and welcome any feedback about these sites."
  },
  {
    key: "Google",
    value: "Google's advertising requirements can be summed up by Google's Advertising Principles. They are put in place to provide a positive experience for users. httpss://support.google.com/adwordspolicy/answer/1316548?hl=en"
  },
  {
    key: "We use Google AdSense Advertising on our website.",
    value: "Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on previous visits to our site and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.\n\nWe have implemented the following:\n• Remarketing with Google AdSense\n• Google Display Network Impression Reporting\n• Demographics and Interests Reporting\n• DoubleClick Platform Integration\n\nWe, along with third-party vendors such as Google use first-party cookies (such as the Google Analytics cookies) and third-party cookies (such as the DoubleClick cookie) or other third-party identifiers together to compile data regarding user interactions with ad impressions and other ad service functions as they relate to our website.\n\nOpting out:\nUsers can set preferences for how Google advertises to you using the Google Ad Settings page. Alternatively, you can opt out by visiting the Network Advertising Initiative Opt Out page or by using the Google Analytics Opt Out Browser add on."
  },
  {
    key: "COPPA (Children Online Privacy Protection Act)",
    value: "When it comes to the collection of personal information from children under the age of 13 years old, the Children's Online Privacy Protection Act (COPPA) puts parents in control. The Federal Trade Commission, United States' consumer protection agency, enforces the COPPA Rule, which spells out what operators of websites and online services must do to protect children's privacy and safety online.\n\nWe market to\nWe do not collect information from children under 13\nchildren under 13.\nDo we let third-parties, including ad networks or plug-ins collect PII from children under 13?\nNo."
  },
  {
    key: "In order to remove your child's information please contact the following personnel:",
    value: "We adhere to the following COPPA tenants:\n• Parents can review, delete, manage or refuse with whom their child's information is shared through contacting us directly. \nor contacting us directly."
  },
  {
    key: "Fair Information Practices",
    value: "The Fair Information Practices Principles form the backbone of privacy law in the United States and the concepts they include have played a significant role in the development of data protection laws around the globe. Understanding the Fair Information Practice Principles and how they should be implemented is critical to comply with the various privacy laws that protect personal information.\n\nIn order to be in line with Fair Information Practices we will take the following responsive action, should a data breach occur:\nWe will notify the users via in-site notification\n• Within 7 business days\n\nWe also agree to the Individual Redress Principle which requires that individuals have the right to legally pursue enforceable rights against data collectors and processors who fail to adhere to the law. This principle requires not only that individuals have enforceable rights against data users, but also that individuals have recourse to courts or government agencies to investigate and/or prosecute non-compliance by data processors.\n\nCAN SPAM Act\n\nThe CAN-SPAM Act is a law that sets the rules for commercial email, establishes requirements for commercial messages, gives recipients the right to have emails stopped from being sent to them, and spells out tough penalties for violations.\n\nWe collect your email address in order to:\n\n• Send information, respond to inquiries, and/or other requests or questions\n• Process orders and to send information and updates pertaining to orders.\n• Send you additional information related to your product and/or service\n• Market to our mailing list or continue to send emails to our clients after the original transaction has occurred.\n\nTo be in accordance with CANSPAM, we agree to the following:\n• Not use false or misleading subjects or email addresses.\n• Identify the message as an advertisement in some reasonable way.\n• Include the physical address of our business or site headquarters.\n• Monitor third-party email marketing services for compliance, if one is used.\n• Honor opt-out/unsubscribe requests quickly.\n• Allow users to unsubscribe by using the link at the bottom of each email.\n\nIf at any time you would like to unsubscribe from receiving future emails, you can email us at\nand we will promptly remove you from ALL correspondence."
  },
  {
    key: "Contact Us",
    value: <>{"If there are any questions regarding this privacy policy, you may contact us using "}<a href="https://www.geneo.in/contactus.php">https://www.geneo.in/contactus.php</a></>
  }
]
