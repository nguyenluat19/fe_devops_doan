import { Toaster } from "react-hot-toast";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Helmet } from "react-helmet";

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="wraperAllWeb">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ecommerce",
  description: "Mern stack project",
  keywords: "React.js, Node.js, MongoDb",
  author: "NguyenHuuLuat",
};

export default Layout;
