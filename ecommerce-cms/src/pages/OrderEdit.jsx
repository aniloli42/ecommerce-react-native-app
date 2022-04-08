import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import Input from '../components/formElements/Input';
import PageTitle from '../components/PageTitle';
import Main from '../layouts/Main';

const OrderEdit = () => {
  const { orderId } = useParams();

  return (
    <Main>
      <PageTitle title={`Order ID: ${orderId ?? ''}`} />

      <div className="w-full p-4 md:p-6 bg-gray-800 mt-4 rounded-md">
        <Formik>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1 mb-4">
                <span className="font-normal text-sm text-gray-500">
                  Status
                </span>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-1">
                    <Input type="radio" name="status" value="pending" checked />
                    <p className="text-gray-400">pending</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Input type="radio" name="status" value="processing" />
                    <p className="text-gray-400">processing</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Input type="radio" name="status" value="shipping" />
                    <p className="text-gray-400">shipping</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Input type="radio" name="status" value="delivered" />
                    <p className="text-gray-400">delivered</p>
                  </div>
                </div>
              </label>

              <label className="flex flex-col gap-1 mb-4">
                <span className="font-normal text-sm text-gray-500">
                  Product
                </span>
                <p className="text-gray-400 text-lg">Diamond Ring</p>
              </label>

              <label className="flex flex-col gap-1 mb-4">
                <span className="font-normal text-sm text-gray-500">
                  Order By
                </span>
                <p className="text-gray-400 text-lg">Anil Oli</p>
              </label>
            </form>
          )}
        </Formik>
      </div>
    </Main>
  );
};

export default OrderEdit;
