import { useRef } from 'react';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import Input from '../components/formElements/Input';
import PageTitle from '../components/PageTitle';
import Main from '../layouts/Main';

import image from '../assets/IMG_1086.jpeg';

const OrderEdit = () => {
  const { orderId } = useParams();
  const pendingRef = useRef();
  const processingRef = useRef();
  const shippingRef = useRef();
  const deliveredRef = useRef();

  return (
    <Main>
      <div className="w-full  lg:max-w-4xl self-center">
        <PageTitle title={`Order ID: ${orderId ?? ''}`} />

        <div className="bg-gray-800 p-4 md:p-6 mt-4  rounded-md">
          <Formik
            initialValues={{
              status: 'pending',
              orderPcs: 1,
              shippingCharge: 0,
            }}
            validateOnMount={true}
            onSubmit={(data) => {
              console.log(data);
            }}
          >
            {({ handleSubmit, handleBlur, handleChange, values }) => (
              <form onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Status
                  </span>

                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-1">
                      <input
                        ref={pendingRef}
                        type="radio"
                        name="status"
                        value="pending"
                        className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.status === pendingRef?.current?.value}
                      />
                      <p className="text-gray-400">pending</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        ref={processingRef}
                        type="radio"
                        name="status"
                        value="processing"
                        className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={
                          values.status === processingRef?.current?.value
                        }
                      />
                      <p className="text-gray-400">processing</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        ref={shippingRef}
                        type="radio"
                        name="status"
                        value="shipping"
                        className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.status === shippingRef?.current?.value}
                      />
                      <p className="text-gray-400">shipping</p>
                    </div>

                    <div className="flex items-center gap-1">
                      <input
                        ref={deliveredRef}
                        type="radio"
                        name="status"
                        value="delivered"
                        className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        checked={values.status === deliveredRef?.current?.value}
                      />
                      <p className="text-gray-400">delivered</p>
                    </div>
                  </div>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Order Date
                  </span>
                  <p className="text-gray-400 text-lg">2022/04/08 04:05 pm</p>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Product Image
                  </span>
                  <img
                    src={image}
                    alt="product image"
                    className="w-48 h-48 rounded-md overflow-hidden object-cover bg-gray-600"
                  />
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Product
                  </span>
                  <p className="text-gray-400 text-lg">Diamond Ring</p>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Price
                  </span>
                  <p className="text-gray-400 text-lg">Rs. 500</p>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Order By
                  </span>
                  <p className="text-gray-400 text-lg">Anil Oli</p>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Order Address
                  </span>
                  <p className="text-gray-400 text-lg">Dang</p>
                </label>

                <label className="flex flex-col gap-1 mb-4">
                  <span className="font-normal text-sm text-gray-500">
                    Contact Number
                  </span>
                  <p className="text-gray-400 text-lg">9806242024</p>
                </label>

                {true ? (
                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Size
                    </span>
                    <p className="text-gray-400 text-lg">2</p>
                  </label>
                ) : null}

                <label className="flex flex-col gap-1">
                  <span className="font-normal text-sm text-gray-500">
                    Order Pcs
                  </span>
                  <Input name="orderPcs" />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="font-normal text-sm text-gray-500">
                    Shipping Charge
                  </span>
                  <Input name="shippingCharge" />
                </label>

                <button
                  type="submit"
                  className="outline-none mt-4 text-white px-6 py-2 w-full rounded-md bg-blue-600"
                >
                  Update Order
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Main>
  );
};

export default OrderEdit;
