import { Link } from "react-router-dom";
import { OnboardingButton, OnboardingText } from "./index.styles"


const OnboardingPage = () => {
  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          marginTop: '-56px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <OnboardingText>
          <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic+Coding&display=swap" rel="stylesheet"></link>
          Ready to boost your code to the next level?
        </OnboardingText>
        <Link to="/auth">
          <OnboardingButton>
            Get Started
          </OnboardingButton>
        </Link>
      </div>
    </>
  )
}

export default OnboardingPage;