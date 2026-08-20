import { getClient } from "@/app/lib/client.js";
import { LIST_USERS } from "@/app/lib/users_used";
import { LIST_USERS_TEMP } from "@/public/tempDB";
import Table from "@/app/components/general/Table.js";
import AddUser from "@/app/components/Admin/AddUser";
import { ApolloWrapper } from "@/app/lib/apollo_provider";

const Admin_User = async () => {
	const {
		data: { users },
		error,
		loading,
	} = await getClient().query({ query: LIST_USERS });

	const colHeaders = users.length > 0 ? Object.keys(users[0]).slice(1) : false;

	console.log("[USERS COLHEADER]", colHeaders);
	return (
		<>
			<ApolloWrapper>
				<AddUser />
			</ApolloWrapper>

			<p className="admin_display_controls_right">Items per page</p>
			<div className="admin_display_content">
				{loading ? (
					<p>loading...</p>
				) : colHeaders ? (
					<Table colHeaders={colHeaders} data={users} type="user" />
				) : (
					<div>
						<h2>No Users Added</h2>
					</div>
				)}
			</div>
		</>
	);
};

export default Admin_User;
