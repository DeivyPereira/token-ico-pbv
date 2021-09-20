import React from "react";

const Metamask = (props) => {
  return (
    <>
      <div className="feature__text-content">
        <h2 className="feature__text-title">
          Para realizar una oferta debes activar Metamask y conectarte conectarte a la Red Rinkeby
        </h2>
      </div>
      <div class="row text-center">
        <div class="col-md-12">
          <img
            id="metaicon"
            class="meta-gray"
            width="500"
            height="100"
            src="https://logowik.com/content/uploads/images/metamask4112.jpg"
             alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Metamask;
