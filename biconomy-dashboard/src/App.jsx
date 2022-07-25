import { useState } from "react";
import reactLogo from "./assets/react.svg";
import bicoLogo from "./assets/Bico.png";
import "./App.css";
import { useQuery } from "urql";

const HourlyStakes = `
  query {
      rollingStakedForLast24Hours {
        id
        cumulativeAmount
        count
      }
  }
`;
const CoolDown = `
  query {
    coolDownCounts {
      id
      count
    }
  }
`;
const UniqueStakes = `
  query {
    uniqueWalletCounts {
      id
      count
    }
  }
`;

const App = () => {
  const [HourlyStakesResult, reexecuteQueryHourlyStakes] = useQuery({
    query: HourlyStakes,
  });

  const [CoolDownResults, reexecuteQueryCoolDowns] = useQuery({
    query: CoolDown,
  });

  const [UniqueStakesResults, reexecuteQueryUniqueStakes] = useQuery({
    query: UniqueStakes,
  });

  const {
    data: HourlyStakesData,
    fetching: HourlyStakesFetching,
    error: HourlyStakesError,
  } = HourlyStakesResult;
  const {
    data: CoolDownData,
    fetching: CoolDownFetching,
    error: CoolDownError,
  } = CoolDownResults;
  const {
    data: UniqueStakesData,
    fetching: UniqueStakesFetching,
    error: UniqueStakesError,
  } = UniqueStakesResults;

  if (HourlyStakesFetching) return <p>Loading...</p>;
  if (HourlyStakesError) return <p>Oh no... {HourlyStakesError.message}</p>;

  console.log(HourlyStakesData);
  console.log(CoolDownData);
  console.log(UniqueStakesData);

  return (
    <div className="App">
      <div className="topleft">
        <a href="https://biconomy.io" target="_blank">
          <img src={bicoLogo} className="logo bico" alt="Biconomy Logo" />
        </a>
      </div>

      <div className="heading">
        <h1>Biconomy Dashboard</h1>
      </div>

      <div className="gasless">
        <iframe
          src="https://stats.biconomy.io/embed/query/95/visualization/120?api_key=xrY6AYEt8JUg6x9zqOGzHDVGcNxrAJXafI0qKF4H&"
          width="530"
          height="200"
        ></iframe>
        <iframe
          src="https://stats.biconomy.io/embed/query/686/visualization/994?api_key=BWhR2qTn010FNE2xmtL1efwQf6imvPXuV2cQCIjV&"
          width="530"
          height="200"
        ></iframe>
        <iframe
          src="https://stats.biconomy.io/embed/query/97/visualization/121?api_key=dB7yJ6eNR3mYdPxNgsBBBjGfDMCAckiarHu631UJ&"
          width="530"
          height="200"
        ></iframe>
        <iframe
          src="https://stats.biconomy.io/embed/query/1363/visualization/1685?api_key=GBSdoLFsO7SUHwtm1xkaN8fNeKaCELb0xPZGBDst&"
          width="530"
          height="200"
        ></iframe>
      </div>

      <div className="hyphen">
        <iframe
          src="https://charts.mongodb.com/charts-hyphen-nepqn/embed/dashboards?id=064c7421-7efa-4c46-af57-05013cdf2901&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=true&scalingWidth=scale&scalingHeight=scale"
          width="400"
          height="1000"
        ></iframe>
      </div>

      <ul className="misc">
        {HourlyStakesData.rollingStakedForLast24Hours.map(
          (HourlyStakesData) => (
            <li key={HourlyStakesData.id}>
              {HourlyStakesData.cumulativeAmount} $BICO staked in last 24 hours
            </li>
        ))}
         {CoolDownData.coolDownCounts.map((CoolDownData) => (
          <li key={CoolDownData.id}>
            {CoolDownData.count} Total Addresses in CoolDown
          </li>
        ))}
        {UniqueStakesData.uniqueWalletCounts.map((UniqueStakesData) => (
          <li key={UniqueStakesData.id}>
            {UniqueStakesData.count} Total Unique Stakes
          </li>
        ))}
      </ul>
      <ul>
        {CoolDownData.coolDownCounts.map((CoolDownData) => (
          <li key={CoolDownData.id}>
            {CoolDownData.count} Total Addresses in CoolDown
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
