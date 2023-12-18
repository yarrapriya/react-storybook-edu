import { Box, Typography } from '@mui/material';
import { IStyles } from '../../../commonUtils/styleUtils';
const styles: IStyles = {

};

export const Cookie = () => {
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
    "key": "What Are Cookies?",
    "value": "As is common practice with almost all professional websites this site uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored however this may downgrade or 'break' certain elements of the sites functionality.\n\nFor more general information on cookies see the Wikipedia article on HTTP Cookies (httpss://en.wikipedia.org/wiki/HTTP_cookie)."
  },
  {
    "key": "How We Use Cookies?",
    "value": "We use cookies for a variety of reasons detailed below. Unfortunately in most cases there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use."
  },
  {
    "key": "Disabling Cookies",
    "value": "You can prevent the setting of cookies by adjusting the settings on your browser (see your browser Help for how to do this). Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of the this site. Therefore it is recommended that you do not disable cookies."
  },
  {
    "key": "The Cookies We Set",
    "value": "If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out however in some cases they may remain afterwards to remember your site preferences when logged out.\n\nWe use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.\n\nThis site offers newsletter or email subscription services and cookies may be used to remember if you are already registered and whether to show certain notifications which might only be valid to subscribed/unsubscribed users.\n\nThis site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.\n\nFrom time to time we offer user surveys and questionnaires to provide you with interesting insights, helpful tools, or to understand our user base more accurately. These surveys may use cookies to remember who has already taken part in a survey or to provide you with accurate results after you change pages.\n\nWhen you submit data to through a form such as those found on contact pages or comment forms cookies may be set to remember your user details for future correspondence.\n\nIn order to provide you with a great experience on this site we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences."
  },
  {
    "key": "Third Party Cookies",
    "value": "In some special cases we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.\n\nThis site uses Google Analytics which is one of the most widespread and trusted analytics solution on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.\n\nFor more information on Google Analytics cookies, see the official Google Analytics page.\n\nThird party analytics are used to track and measure usage of this site so that we can continue to produce engaging content. These cookies may track things such as how long you spend on the site or pages you visit which helps us to understand how we can improve the site for you.\n\nFrom time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimisations our users appreciate the most.\n\nAs we sell products it's important for us to understand statistics about how many of the visitors to our site actually make a purchase and as such this is the kind of data that these cookies will track. This is important to you as it means that we can accurately make business predictions that allow us to monitor our advertising and product costs to ensure the best possible price.\n\nThe Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times that a given ad is shown to you.\n\nFor more information on Google AdSense see the official Google AdSense privacy FAQ.\n\nWe use adverts to offset the costs of running this site and provide funding for further development. The behavioural advertising cookies used by this site are designed to ensure that we provide you with the most relevant adverts where possible by anonymously tracking your interests and presenting similar things that may be of interest.\n\nIn some cases we may provide you with custom content based on what you tell us about yourself either directly or indirectly by linking a social media account. These types of cookies simply allow us to provide you with content that we feel may be of interest to you.\n\nSeveral partners advertise on our behalf and affiliate tracking cookies simply allow us to see if our customers have come to the site through one of our partner sites so that we can credit them appropriately and where applicable allow our affiliate partners to provide any bonus that they may provide you for making a purchase.\n\nWe also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work the following social media sites including; LinkedIn, Facebook, Twitter, Stumble Upon, Google+, YouTube, Pinterest, Instagram, Tumblr, VKontakte, Pinterest, Reddit, Flickr, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.\n\nMore Information\n\nIf there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.\n\nHowever if you are still looking for more information then you can contact us through one of our preferred contact methods.\n\nPhone: +91 22 6780 9292"
  }
]
