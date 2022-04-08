import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import Main from '../layouts/main';
import Input from '../components/formElements/Input';
import { loginSchema } from '../schema';
import { useUserContext } from '../context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  return (
    <Main>
      <div className=" bg-gray-800 max-w-md w-full md:w-[500px] rounded-md min-h-fit px-8 py-12 md:px-10 mt-12 self-center">
        <h2 className="text-white font-semibold text-xl">Login</h2>

        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={async (data) => {
            try {
              if (
                import.meta.env.VITE_USERNAME !== data.username &&
                import.meta.env.VITE_PASSWORD !== data.password
              )
                return;

              window.localStorage.setItem(
                'user',
                JSON.stringify({
                  user: data.username,
                })
              );
              setUser({ username: data.username });
              navigate('/', {
                replace: true,
              });
            } catch (error) {
              console.log(error.message);
            }
          }}
          validationSchema={loginSchema}
        >
          {({ handleSubmit }) => {
            return (
              <Form className="mt-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                  <span className="font-normal text-sm text-gray-500">
                    Username
                  </span>
                  <Input name="username" type="username" />
                </label>

                <label className="flex flex-col gap-1 mt-4">
                  <span className="font-normal text-sm text-gray-500">
                    Password
                  </span>

                  <Input name="password" type="password" />
                </label>

                <button
                  type="submit"
                  className="outline-none mt-8 text-white px-6 py-2 w-full rounded-md bg-blue-600"
                >
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Main>
  );
};

export default Login;
