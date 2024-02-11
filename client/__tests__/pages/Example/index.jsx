// eslint-disable-next-line react/prop-types
const Example = ({ username = 'aka' }) => {
  console.log(username);
  return (
    <div>
      <h1 data-testid="test">Welcome, {username}!</h1>
      <p data-testid="test-2">This is the home page.</p>
    </div>
  );
};

export default Example;
