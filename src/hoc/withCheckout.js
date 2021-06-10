import React, { useContext } from "react";
import CheckoutFooter from "../components/CheckoutFooter";
import CheckoutHeader from "../components/CheckoutHeader";
import CheckoutSideBar from "../components/CheckoutSideBar";
import ShoppingContext from "../context";
import "./CheckoutStyles.scss";

// function getDisplayName(WrappedComponent) {
//   return WrappedComponent.displayName || WrappedComponent.name || "Component";
// }

function Checkout(WrappedComponent) {
  // WrappedComponent.displayName = `withCheckout(${getDisplayName(
  //   WrappedComponent,
  // )})`;

  function WrapperComponent() {
    // const { details, updateDetails } = useContext(ShoppingContext);
    return (
      <section className="mainContainer">
        <div className="checkoutContainer">
          <CheckoutHeader />

          <WrappedComponent />
          <div>
            <code>{JSON.stringify(useContext(ShoppingContext))}</code>
          </div>

          <CheckoutFooter />
        </div>
        <CheckoutSideBar />
      </section>
    );
  }

  return WrapperComponent;
}

export default Checkout;
