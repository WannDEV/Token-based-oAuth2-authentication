import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <h1>Error page</h1>
      <p>An error has occurred</p>
    </div>
  );
};

export async function getStaticProps(context) {
  return {
    props: {
      protected: false,
    },
  };
}

export default ErrorPage;
