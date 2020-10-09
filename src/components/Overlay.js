import React, { Component } from 'react'
import './Overlay.scss'

 class Overlay extends Component {
    render() {
        return (
          <>
            <a className="china" href="#"></a>
            <a className="italy" href="#"></a>
            <a className="japan" href="#"></a>
            <a className="iran" href="#">
              IRAN
            </a>

            <a
              class="mexico"
              href="#"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {/* <i class="fa fa-male"></i>
            <i class="fa fa-male"></i> */}
            </a>
            <a
              class="brazil"
              href="#"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "black",
              }}
            >
              {/* <i class="fa fa-male"></i> */}
              {/* <i class="fa fa-male"></i> */}
            </a>
            <a class="congo">Congo</a>
            <a class="indo" href="#"></a>
            <a class="indi" href="#"></a>

            <a class="york" href="#"></a>
            <a class="uk" href="#"></a>

            <a class="russia" href="#"></a>
          </>
        );
    }
}

export default Overlay
