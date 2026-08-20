import Link from "next/link";
import { logOut } from "@/app/lib/serverQueryFnc";
import { usePathname } from "next/navigation";

const User = ({ user }) => {
	let { role, name, access } = user ? user : { role: "", name: "", access: "" };
	const path = usePathname();

	return (
		<ul className="navContainer_section">
			<li
				className={`navContainer-li ${path.includes("admin") ? "" : "remove"}`}>
				<Link href="/landing_edit">Edit Landing Page</Link>
			</li>

			{!name && !role && (
				<li
					className={`navContainer-li  ${
						path.includes("signin") ? "remove" : ""
					}`}>
					<Link href="/signin">SignIn</Link>
				</li>
			)}
			{!name && !role && (
				<li
					className={`navContainer-li  ${
						path.includes("signup") ? "remove" : ""
					}`}>
					<Link href="/signup">SignUp</Link>
				</li>
			)}
			{name && role && (
				<li className={`navContainer-li `} onClick={() => logOut()}>
					LogOut
				</li>
			)}
			{role === "admin" && (
				<li
					className={`navContainer-li ${
						path.includes("admin") ? "active" : ""
					}`}>
					<Link href="/admin">Admin</Link>
				</li>
			)}
			{role === "customer" && (
				<li
					className={`navContainer-li ${
						path.includes("user") ? "active" : ""
					}`}>
					<Link href="/user">{name}</Link>
				</li>
			)}
		</ul>
	);
};

export default User;
