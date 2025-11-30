const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderEmail = async (order, user) => {
  const itemsHtml = order.items.map(it =>
    `<li>${it.name} (${it.size}) x${it.qty} — ₹${it.price}</li>`
  ).join('');

  await transporter.sendMail({
    from: '"Ecommerce Store" <no-reply@store.com>',
    to: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: ${order._id}</p>
      <h3>Items</h3>
      <ul>${itemsHtml}</ul>
      <h3>Total: ₹${order.totalPrice}</h3>
    `
  });
};


module.exports = sendOrderEmail;

