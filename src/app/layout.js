import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";

export const metadata = {
  title: "Expense Tracker",
  description: "Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-bg">{children}</body>
    </html>
  );
}
