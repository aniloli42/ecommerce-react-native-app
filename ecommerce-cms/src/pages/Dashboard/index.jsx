import Card from '../../components/Card';
import Main from '../../layouts/main';

import {
  MdLocalShipping,
  MdAvTimer,
  MdPending,
  MdDoneAll,
} from 'react-icons/md';
import PageTitle from '../../components/PageTitle';
import PageCard from './PageCard';

const IconStyle = {
  width: '1.8em',
  height: 'auto',
  fill: 'white',
};

const Dashboard = () => {
  return (
    <>
      <Main>
        <PageTitle title="Dashboard" />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3 w-full sm:grid-cols-2 lg:grid-cols-4 mt-4">
          <Card title={'Pending Orders'} count={5} color="#0275d8">
            <MdPending style={IconStyle} />
          </Card>
          <Card title={'Processing Orders'} count={2} color="#f0ad4e">
            <MdAvTimer style={IconStyle} />
          </Card>
          <Card title={'Shipping Orders'} count={5} color="#5bc0de">
            <MdLocalShipping style={IconStyle} />
          </Card>
          <Card title={'Completed Orders'} count={15} color="#5cb85c">
            <MdDoneAll style={IconStyle} />
          </Card>
        </div>

        {/* Navigator Cards */}

        <div className="w-full mt-12">
          <PageTitle title="Pages" />

          <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
            <PageCard title="Products" path="/products" />
            <PageCard title="Orders" path="/orders" />
          </div>
        </div>
      </Main>
    </>
  );
};

export default Dashboard;
