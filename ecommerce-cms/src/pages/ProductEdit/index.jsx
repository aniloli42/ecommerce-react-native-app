import { useRef, useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/formElements/Input';
import PageTitle from '../../components/PageTitle';
import Main from '../../layouts/Main';
import { productSchema } from '../../schema';
import { getStorage, ref, uploadBytes, deleteObject } from 'firebase/storage';
import {
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  collection,
  getDoc,
} from 'firebase/firestore';
import { firebaseDB } from '../../firebase';

import Modal from '../../components/Modal';
import { AnimatePresence } from 'framer-motion';

const ProductEdit = () => {
  const storage = getStorage();
  const { productId } = useParams();
  const navigate = useNavigate();

  let productRef;

  if (productId != undefined) {
    productRef = doc(firebaseDB, 'products', productId);
  }

  // for modal
  const callback = useRef(null);
  const [fileUploading, setFileUploading] = useState(false);
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

  const ringRef = useRef();
  const earRingRef = useRef();
  const neckLaceRef = useRef();
  const stockTrueRef = useRef();
  const stockFalseRef = useRef();
  const [product, setProduct] = useState();
  const [imagesURL, setImagesURL] = useState([]);
  const [init, setInit] = useState({
    product: '',
    price: 0,
    desc: '',
    type: 'Ring',
    sizes: '',
    stock: 'true',
  });

  useEffect(() => {
    const getProduct = async () => {
      if (productId === undefined) return;

      const productsSnap = await getDoc(productRef);

      if (productsSnap.exists() === false)
        return navigate('/404', { replace: true });

      setProduct(productsSnap.data());
    };

    getProduct();
  }, []);

  useEffect(() => {
    if (product == null) return;

    setInit((prevInit) => ({
      ...prevInit,
      product: product.product,
      price: product.price,
      desc: product.desc,
      type: product.type,
      sizes: product?.sizes ? product.sizes.map((size) => size).join(',') : '',
      stock: product.stock.toString(),
    }));

    setImagesURL(product.images);
  }, [product]);

  const deleteAlreadyExists = async () => {
    if (imagesURL?.length === 0) return;

    imagesURL.map(async (image) => {
      const storageRef = ref(storage, image);
      await deleteObject(storageRef);
    });
  };

  const uploadToFirebase = async (imagesArr) => {
    setImagesURL([]);
    return [...imagesArr]?.map(async (image) => {
      const splittedName = image.name.split('.');
      const fileExt = splittedName.at(-1);
      splittedName.splice(-1);

      const initialName = splittedName.map((n) => n).join('.');
      const newFileName = `${initialName}-${Date.now()}.${fileExt}`;
      const filePath = `images/${newFileName}`;
      const storageRef = ref(storage, filePath);

      const snapshot = await uploadBytes(storageRef, image);
      setImagesURL((prev) => [...prev, snapshot.metadata.fullPath]);
      return snapshot;
    });
  };

  const handleFileUpload = async (e) => {
    try {
      const files = e.target.files;

      if (files == null) return;
      if (files.length === 0) return;

      setFileUploading(true);

      await deleteAlreadyExists();
      const uploadingResult = await uploadToFirebase(files);

      await Promise.all(uploadingResult);
      setFileUploading(false);

      setModalText('File Uploaded');
      openModal();
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleDelete = async () => {
    await deleteDoc(productRef).then(() => {
      setModalText('Product Deleted');
      openModal(() => {
        navigate(-1);
      });
    });
  };

  return (
    <>
      <AnimatePresence initial={false} exitBeforeEnter={true}>
        {modal && <Modal text={modalText} handleClose={closeModal} />}
      </AnimatePresence>

      <Main>
        <div className="w-full  lg:max-w-4xl self-center">
          {productId !== undefined && (
            <div className="flex justify-between">
              <PageTitle title={`Product ID: ${productId ?? ''}`} />

              <button
                onClick={handleDelete}
                className="text-gray-300 text-xs py-2 px-4 bg-red-600 rounded-md hover:bg-red-500 focus-visible:bg-red-500 active:bg-red-400"
              >
                Delete
              </button>
            </div>
          )}

          <div className="bg-gray-800 p-4 md:p-6 mt-4  rounded-md">
            <Formik
              initialValues={init}
              validationSchema={productSchema}
              validateOnChange={true}
              onSubmit={async (data) => {
                try {
                  const formData = {
                    product: data.product,
                    price: data.price,
                    desc: data.desc,
                    type: data.type,
                    sizes:
                      data.type === 'Ring'
                        ? data.sizes.split(',').map((s) => parseInt(s))
                        : null,
                    stock: data.stock === 'true' ? true : false,
                    images: imagesURL,
                    createdAt: Date.now(),
                  };

                  if (productId !== undefined) {
                    await setDoc(productRef, formData, { merge: true });

                    setModalText('Product Updated');
                    openModal(() => {
                      navigate(-1);
                    });
                    return;
                  }

                  const newProductRef = collection(firebaseDB, 'products');
                  await addDoc(newProductRef, formData);

                  setModalText('Product Added');
                  openModal(() => {
                    navigate(-1);
                  });
                } catch (e) {
                  console.log(e.message);
                }
              }}
              enableReinitialize={true}
              validateOnMount
            >
              {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                isValid,
              }) => (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Product Name
                    </span>
                    <Input name="product" />
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Description
                    </span>
                    <Input name="desc" />
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Price
                    </span>
                    <Input name="price" />
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Type
                    </span>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <input
                          ref={ringRef}
                          type="radio"
                          name="type"
                          value="Ring"
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.type === ringRef?.current?.value}
                        />
                        <p className="text-gray-400">Ring</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          ref={earRingRef}
                          type="radio"
                          name="type"
                          value="Ear Ring"
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.type === earRingRef?.current?.value}
                        />
                        <p className="text-gray-400">Ear Ring</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          ref={neckLaceRef}
                          type="radio"
                          name="type"
                          value="Necklace"
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={values.type === neckLaceRef?.current?.value}
                        />
                        <p className="text-gray-400">Necklace</p>
                      </div>
                    </div>
                  </label>

                  {values.type === 'Ring' && (
                    <label className="flex flex-col gap-1 mb-4">
                      <span className="font-normal text-sm text-gray-500">
                        Sizes
                      </span>
                      <Input name="sizes" />

                      <span className="text-gray-400 text-xs">
                        sizes in comma separated eg: 2,4,6
                      </span>
                    </label>
                  )}

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Stock
                    </span>

                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-1">
                        <input
                          ref={stockTrueRef}
                          type="radio"
                          name="stock"
                          value={true}
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={
                            values.stock === stockTrueRef?.current?.value
                          }
                        />
                        <p className="text-gray-400">true</p>
                      </div>

                      <div className="flex items-center gap-1">
                        <input
                          ref={stockFalseRef}
                          type="radio"
                          name="stock"
                          value={false}
                          className="focus:ring-0 outline-none bg-gray-700 text-gray-600"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          checked={
                            values.stock === stockFalseRef?.current?.value
                          }
                        />
                        <p className="text-gray-400">false</p>
                      </div>
                    </div>
                  </label>

                  <label className="flex flex-col gap-1 mb-4">
                    <span className="font-normal text-sm text-gray-500">
                      Product Images
                    </span>
                    <input
                      type="file"
                      name="images"
                      accept="image/png,image/jpeg"
                      className="text-gray-500 mt-3 outline-none ring-0"
                      multiple
                      onChange={handleFileUpload}
                    />
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
                    disabled={fileUploading || !isValid}
                  >
                    {fileUploading === false
                      ? productId
                        ? 'Update'
                        : 'Add'
                      : 'Wait File uploading'}
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

export default ProductEdit;
