import { useState, useRef } from 'react';
import { Formik, Form } from 'formik';
import Main from '../layouts/main';
import Input from '../components/formElements/Input';
import { loginSchema } from '../schema';
import { useUserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import Modal from '../components/Modal';

const Login = () => {
  const { user, setUser } = useUserContext();

  // for modal
  const callback = useRef(null);
  const [modal, setModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const openModal = (cb) => {
    document.body.style.overflow = 'hidden';
    setModal(true);

    if (cb) callback.current = cb;
  };
  const closeModal = () => {
    document.body.style.overflow = 'auto';
    setModal(false);

    if (callback.current) callback.current();
  };

  const navigate = useNavigate();

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal && <Modal text={modalText} handleClose={closeModal} />}
      </AnimatePresence>
      <Main>
        <div className=" bg-gray-800 max-w-md w-full md:w-[500px] rounded-md min-h-fit px-8 py-12 md:px-10 mt-12 self-center">
          <h2 className="text-white font-semibold text-xl">Login</h2>

          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            onSubmit={async ({ username, password }) => {
              try {
                setModalText('Wait...');
                openModal();
                const res = await axios.post(
                  import.meta.env.VITE_AUTH_SERVER_URL,
                  {
                    username,
                    password,
                  }
                );

                sessionStorage.setItem('cms', res.data.accessToken);
                document.body.style.overflow = 'auto';
                navigate('/', { replace: true });
              } catch (error) {
                console.log(error?.response?.data?.message);

                setModalText(error?.response?.data?.message ?? error.message);
                openModal();
              }
            }}
            validationSchema={loginSchema}
          >
            {({ handleSubmit, isValid }) => {
              return (
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <label className="flex flex-col gap-1">
                    <span className="font-normal text-sm text-gray-500">
                      Username
                    </span>
                    <Input name="username" type="text" />
                  </label>

                  <label className="flex flex-col gap-1 mt-4">
                    <span className="font-normal text-sm text-gray-500">
                      Password
                    </span>

                    <Input name="password" type="password" />
                  </label>

                  <button
                    type="submit"
                    className={`outline-none mt-8 text-white px-6 py-2 w-full rounded-md 
                    
                    ${
                      isValid
                        ? 'bg-blue-600 hover:bg-blue-700 focus-visible:bg-blue-700 focus-visible:ring-1 focus-visible:ring-white active:bg-blue-500'
                        : 'bg-gray-500 disabled:cursor-not-allowed'
                    }
                    `}
                    disabled={!isValid}
                  >
                    Login
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </Main>
    </>
  );
};

export default Login;
