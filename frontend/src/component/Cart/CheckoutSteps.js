import { Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import AccountBalaceIcon from '@material-ui/icons/AccountBalance';
import './CheckoutSteps.css';

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalaceIcon />,
    },
  ];

  const stepsStyles = {
    boxSizing: 'border-box',
  };

  return (
    <>
      <Stepper alternativeLabel activeStep={activeStep} style={stepsStyles}>
        {steps.map((step, i) => (
          <Step
            key={i}
            active={activeStep === i ? true : false}
            completed={activeStep >= i ? true : false}
          >
            <StepLabel
              icon={step.icon}
              style={{
                color: activeStep >= i ? '#eb4034' : 'rgba(0,0,0,0.649)',
              }}
            >
              {step.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CheckoutSteps;
