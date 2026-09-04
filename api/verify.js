module.exports = (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 'no-cache');
  res.status(200).send('google-site-verification: google011b210fea53a118.html');
};