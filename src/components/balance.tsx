import { formatUsd } from "@galoymoney/client"
import { SatFormat, Spinner } from "@galoymoney/react"

import useMyUpdates from "hooks/use-my-updates"
import { translate, history, useAuthContext } from "store/index"

const navigateToHome = () => {
  history.push("/")
}

type FCT = React.FC<{ balance: number }>

const BalanceMain: FCT = ({ balance }) => {
  const { satsToUsd } = useMyUpdates()

  return (
    <div className="balance" onClick={navigateToHome}>
      <div className="title">{translate("Current Balance")}</div>
      <div className="value">
        {Number.isNaN(balance) ? (
          <Spinner />
        ) : (
          <>
            <div className="primary">
              <SatFormat amount={balance} />
            </div>
            {satsToUsd && (
              <div className="secondary">&#8776; {formatUsd(satsToUsd(balance))}</div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const Balance: FCT = ({ balance }) => {
  const { isAuthenticated } = useAuthContext()

  if (!isAuthenticated) {
    return (
      <div className="balance" onClick={navigateToHome}>
        <div className="title">{translate("Current Balance")}</div>
        <div className="value">
          <div className="primary">
            <SatFormat amount={0} />
          </div>
          <div className="secondary">{formatUsd(0)}</div>
        </div>
      </div>
    )
  }

  return <BalanceMain balance={balance} />
}

export default Balance
