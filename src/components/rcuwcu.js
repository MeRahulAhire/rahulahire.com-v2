import React from "react";
import { Helmet } from "react-helmet";
import "../style/rcuwcu.css";
const rcu = () => {
  const rps = document.getElementById("rps");
  const size = document.getElementById("size");
  const select = document.getElementById("select");
  if (select.value === "") alert("Select consistency mode");
  if (select.value !== "" && rps.value === "") {
    alert("Enter the no. of request/Sec");
  }
  if (rps.value !== "" && size.value === "") {
    alert("Enter the size of item");
  }
  if (
    (rps.value !== "" && isFinite(`${rps.value}`) === false) ||
    (size.value !== "" && isFinite(`${size.value}`) === false)
  ) {
    alert("Entered value is not a number");
  }

  const result = (rps.value * Math.round(size.value)) / (4 * select.value) + 1;

  const resDisplay = document.getElementById("result");
  resDisplay.style.display = "flex";
  resDisplay.innerHTML = `Total RCU = <div  >${result}</div>`;
};
const wcu = () => {
  const rpsWcu = document.getElementById("rps-wcu");
  const sizeWcu = document.getElementById("size-wcu");
  if (rpsWcu.value === "") {
    alert("Enter the no. of request/Sec");
  }
  if (rpsWcu.value !== "" && sizeWcu.value === "") {
    alert("Enter the size of item");
  }
  if (
    (rpsWcu.value !== "" && isFinite(`${rpsWcu.value}`) === false) ||
    (sizeWcu.value !== "" && isFinite(`${sizeWcu.value}`) === false)
  ) {
    alert("Entered value is not a number");
  }

  const result = rpsWcu.value * Math.round(sizeWcu.value);
  const resDisplay = document.getElementById("result-wcu");
  resDisplay.style.display = "flex";
  resDisplay.innerHTML = `Total WCU = <div  >${result}</div>`;
};

export default function Rcuwcu() {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculate RCU & WCU in DynamoDB</title>
        <link
          rel="shortcut icon"
          href="https://image.flaticon.com/icons/png/512/346/346399.png"
          type="image/x-icon"
        />
        <meta name="theme-color" content="#0f0f0f" />
        <meta
          name="keywords"
          content="dynamodb, DynamoDB calculator, calculate wcu, calculate rcu"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />
        <meta
          name="description"
          content="Checkout this DynamoDB tool which allows you to calculate RCU and WCU without any headache."
        />
        <meta
          name="title"
          content="Calculate the RCU and WCU of your DynamoDB table (free tool)."
        />
        <meta
          property="og:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/DynamoDB-wrcu-thumbnail.png"
        />
        <meta
          property="og:title"
          content="Calculate the RCU and WCU of your DynamoDB table (free tool)."
        />
        <meta
          property="og:description"
          content="Checkout this DynamoDB tool which allows you to calculate RCU and WCU without any headache."
        />
        <meta property="og:url" content="https://rahulahire.com" />
        <meta property="og:site_name" content="Rahul Ahire" />

        <meta
          name="twitter:title"
          content="Calculate the RCU and WCU of your DynamoDB table (free tool)."
        />
        <meta
          name="twitter:description"
          content="Checkout this DynamoDB tool which allows you to calculate RCU and WCU without any headache."
        />
        <meta
          name="twitter:image"
          content="https://s3.ap-south-1.amazonaws.com/rahulahire.com/DynamoDB-wrcu-thumbnail.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image:alt" content="Rahul Ahire" />
      </Helmet>
      <div className="container">
        <div className="top">
          <div className="top-wrap">
            A free tool to calculate the throughput in DynamoDB <br />
            <a
              href="https://letsfigureout.com/2020/02/01/calculating-wcu-and-rcu-for-amazon-dynamodb/"
              target="_blank"
              rel="noopener noreferrer"
            >
              based on this article.
            </a>
          </div>
        </div>
        <div className="flex-box">
          <div className="box">
            <div className="box-wrap">
              <div className="head">Calculate Read Capacity Units</div>
              <div className="select">
                Select the consistency mode
                <select name="select" id="select" className="choose">
                  <option value="" hidden>
                    Select
                  </option>
                  <option value="1">Strong consistency</option>
                  <option value="2">Eventual consistency</option>
                </select>
              </div>
              <div className="req">
                No. of Request per second
                <input type="tel" id="rps" placeholder="100" />
              </div>
              <div className="req">
                Average size of each item in KB
                <input type="tel" id="size" placeholder="4" />
              </div>
              <div className="submit">
                <button id="submit" onClick={rcu}>
                  Get RCU
                </button>
                <div className="res" id="result">
                  Total WCU = <div>ss</div>
                </div>
              </div>
            </div>
          </div>
          <div className="box wcu-box">
            <div className="box-wrap wrap-wcu">
              <div className="head">Calculate Write Capacity Units</div>

              <div className="req">
                No. of Request per second
                <input type="tel" id="rps-wcu" placeholder="50" />
              </div>
              <div className="req">
                Average size of each item in KB
                <input type="tel" id="size-wcu" placeholder="4" />
              </div>
              <div className="submit">
                <button id="submit-wcu" onClick={wcu}>
                  Get WCU
                </button>
                <div className="res" id="result-wcu">
                  Total WCU = <div>ss</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tweet-box">
          Loved this tool, then{" "}
          <a
            href="https://twitter.com/intent/tweet?url=https://rahulahire.com/dynamodb-wrcu"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tweet it.
          </a>
        </div>
      </div>
    </>
  );
}
