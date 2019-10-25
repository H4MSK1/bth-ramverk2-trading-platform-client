import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { useAlert } from 'react-alert';
import { addBalance } from 'actions/user';
import { getStateWithDispatcher } from 'providers/StateManagerProvider';
import AddBalanceDialog from 'components/AddBalanceDialog';

const BalanceWidget = () => {
  const alert = useAlert();
  const { state, dispatch } = getStateWithDispatcher();
  const [balanceDialog, setBalanceDialog] = React.useState(false);
  const onSubmitAddBalance = async balance => {
    try {
      await addBalance(dispatch, balance);
      alert.success(`${balance} have been added to your balance`);
    } catch (err) {
      alert.error(err);
    }
  };

  return (
    <Jumbotron className="bg-secondary box-shadow text-primary widget-box">
      <h5>
        <b>Balance available</b>
      </h5>
      <h6>
        <b>
          {state.userBalance} {state.currencySymbol}
        </b>
      </h6>
      <Button
        color="success"
        onClick={() => setBalanceDialog(true)}
        size="sm"
        block
      >
        Add balance
      </Button>

      {balanceDialog && (
        <AddBalanceDialog
          handleSubmit={onSubmitAddBalance}
          onClosed={() => setBalanceDialog(false)}
        />
      )}
    </Jumbotron>
  );
};

export default BalanceWidget;
