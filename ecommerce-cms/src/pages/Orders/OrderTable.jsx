import { Link } from 'react-router-dom';
import image from '../../assets/IMG_1086.jpeg';

const OrderTable = () => {
  return (
    <div className="flex overflow-auto pb-4">
      <div className=" flex-shrink-0 p-4 flex-grow min-w-screen rounded-md bg-gray-700">
        <table className="table-auto  min-w-full  ">
          <thead className="border-b border-b-gray-400">
            <tr>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Product Name
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Product Image
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Order By
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Contact
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Total Price
              </th>

              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Date
              </th>
              <th className="text-gray-500 font-medium text-sm py-2 pr-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="my-2 border-b border-b-gray-600 ">
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Diamond Ring
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                <img
                  src={image}
                  alt="product image"
                  className="w-16 h-16 rounded-md object-cover"
                />
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Anil Oli
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                9806242024
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Rs. 400
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                2022/04/08 4:05
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                <Link to="/orders/5555555">Edit</Link>
              </td>
            </tr>
            <tr className="my-2 ">
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Diamond Ring
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                <img
                  src={image}
                  alt="product image"
                  className="w-16 h-16 rounded-md object-cover"
                />
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Anil Oli
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                9866803070
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                Rs. 500
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                2022/04/08 4:05
              </td>
              <td className="text-gray-400 font-light text-base py-2 pr-4  ">
                <Link to="/orders/aaaa">Edit</Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
