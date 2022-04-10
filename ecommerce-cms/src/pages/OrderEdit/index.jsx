import { useRef, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firebaseDB } from '../../firebase';

import Input from '../../components/formElements/Input';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/Main';
import { orderSchema } from '../../schema';
import getDate from '../../utils/getDate';

import Modal from '../../components/Modal';
import { AnimatePresence } from 'framer-motion';

const OrderEdit = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const pendingRef = useRef();
  const processingRef = useRef();
  const shippingRef = useRef();
  const deliveredRef = useRef();
  const rejectedRef = useRef();

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

  let orderRef;

  if (orderId != undefined) {
    orderRef = doc(firebaseDB, 'orders', orderId);
  }
  const [order, setOrder] = useState();
  const [imageURL, setImageURL] = useState();
  const [init, setInit] = useState({
    status: 'pending',
    orderPcs: 1,
    shippingCharge: 0,
    remarks: '',
  });
  useEffect(() => {
    const getOrder = async () => {
      if (orderId === undefined) return;

      const ordersSnap = await getDoc(orderRef);
      if (ordersSnap.exists() === false)
        return navigate('/404', { replace: true });
      setOrder(ordersSnap.data());
    };

    getOrder();
  }, []);

  const getImageUrl = async () => {
    if (order.productImage == null) return;
    const storage = getStorage();
    const imageRef = ref(storage, order.productImage);

    const getUrl = await getDownloadURL(imageRef);
    setImageURL(getUrl);
  };

  useEffect(() => {
    if (order == null) return;

    setInit((prevInit) => ({
      ...prevInit,
      status: order.status,
      orderPcs: order.orderPcs,
      shippingCharge: order.shippingCharge,
      remarks: order.remarks,
    }));

    getImageUrl();
  }, [order]);

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal && <Modal text={modalText} handleClose={closeModal} />}
      </AnimatePresence>

      <Main>
        <div className="w-full  lg:max-w-4xl self-center">
          <PageTitle title={`Order ID: ${orderId ?? ''}`} />

          <div className="bg-gray-800 p-4 md:p-6 mt-4  rounded-md">
            <Formik
              initialValues={init}
              validationSchema={orderSchema}
              validateOnMount={true}
              onSubmit={async (data) => {
                try {
                  const formData = {
                    ...order,
                    status: data.status,
                    orderPcs: data.orderPcs,
                    shippingCharge: data.shippingCharge,
                    totalPrice:
                      order.productPrice * data.orderPcs + data.shippingCharge,
                    remarks: data.status === 'remarks' ? data.remarks : '',
                  };

                  await setDoc(orderRef, formData, { merge: true });

                  setModalText('Order Updated');
                  openModal(() => {
                    navigate(-1);
                  });
                } catch (e) {
                  console.log(e.message);
                }
              }}
              enableReinitialize={true}
            >
              {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                isValid,
              }) => (
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
                          checked={
                            values.status === shippingRef?.current?.value
                          }
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
                          checked={
                            values.status === deliveredRef?.current?.value
                          }
                        />
                        <p className="text-gray-400">delivered</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          ref={rejectedRef}
                          type="radio"
                          name="status"
                          value="rejected"
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={
                            values.status === rejectedRef?.current?.value
                          }
                        />
                        <p className="text-gray-400">rejected</p>
                      </div>
                    </div>
                  </label>

                  {rejectedRef?.current?.checked && (
                    <label className="flex flex-col gap-1 my-4">
                      <span className="font-normal text-sm text-gray-500">
                        Remarks
                      </span>
                      <Input name="remarks" type="text" />
                      <p className="text-gray-500 text-xs mt-1">
                        Note: If you reject this order, write the reject note.
                        Note will be visible to user.
                      </p>
                    </label>
                  )}

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Order Date
                    </span>
                    <p className="text-gray-400 text-lg">
                      {order?.orderAt ? getDate(order.orderAt) : 'Order Date'}
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Product Image
                    </span>
                    <img
                      src={imageURL}
                      alt="product image"
                      className="w-48 h-48 rounded-md overflow-hidden object-cover bg-gray-600"
                    />
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Product
                    </span>
                    <p className="text-gray-400 text-lg">
                      {order?.productTitle ?? 'Product'}
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Price
                    </span>
                    <p className="text-gray-400 text-lg">
                      Rs. {order?.productPrice}
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Order By
                    </span>
                    <p className="text-gray-400 text-lg">{order?.orderName}</p>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Order Address
                    </span>
                    <p className="text-gray-400 text-lg">
                      {order?.orderAddress ?? 'Place'}
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Contact Number
                    </span>
                    <p className="text-gray-400 text-lg">
                      {order?.phoneNumber ?? '**********'}
                    </p>
                  </label>

                  {order?.productType === 'Ring' ? (
                    <label className="flex flex-col gap-1 mb-4">
                      <span className="font-normal text-sm text-gray-500">
                        Size
                      </span>
                      <p className="text-gray-400 text-lg">
                        {order?.productSize}
                      </p>
                    </label>
                  ) : null}

                  <label className="flex flex-col gap-1 mt-4">
                    <span className="font-normal text-sm text-gray-500">
                      Order Pcs
                    </span>
                    <Input name="orderPcs" type="number" />
                    <p className="text-gray-500 text-xs mt-1">
                      Change the value of orderPcs after order confirmation.
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mt-4">
                    <span className="font-normal text-sm text-gray-500">
                      Shipping Charge
                    </span>
                    <Input name="shippingCharge" type="number" />
                    <p className="text-gray-500 text-xs mt-1">
                      if shipping charges is not applied then leave to 0.
                    </p>
                  </label>

                  <label className="flex flex-col gap-1 mt-4">
                    <span className="font-normal text-sm text-gray-500">
                      Total Price
                    </span>

                    <p className="text-gray-400 text-lg">
                      {`${
                        values.orderPcs * order?.productPrice +
                        values.shippingCharge
                      }`}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Note: Total Price will be automatic calculate
                    </p>
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
    </>
  );
};

export default OrderEdit;
