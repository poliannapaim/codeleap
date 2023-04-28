import { wrapper } from '../redux/store';

function UserPosts() {
  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  store.dispatch(setTitle('My Title'));
  store.dispatch(setContent('My Content'));

  return {
    props: {},
  };
});

export default UserPosts;