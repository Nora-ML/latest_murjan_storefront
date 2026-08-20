import "./footer.css";
const Footer = () => {
	return (
		<footer className="footer_container">
			<div className="footer_wrapper">
				<form className="footer_form" action="#">
					<label for="newsletter">Suscribe to our newsletter</label>
					<div className="flex">
						<input
							type="email"
							name="newsletter"
							id="newsletter"
							placeholder="Your e-mail"
							required="required"
						/>
						<div className="button-container">
							<button type="submit">Send</button>
						</div>
					</div>
				</form>
				<nav className="footer_nav">
					<ul className="footer_lists_container">
						<li className="footer_main_lists">
							<h4 className="list_header">DDNA</h4>
							<ul>
								<li className="footer_list_item">
									<a href="/collections" className="">
										Core Collections
									</a>
								</li>
								<li className="footer_list_item">
									<a href="/story" className="">
										Our Story
									</a>
								</li>
								<li className="footer_list_item">
									<a href="/personalize" className="">
										Personalize
									</a>
								</li>
								<li className="footer_list_item">
									<a href="/contact" className="">
										Contact
									</a>
								</li>
								<li className="footer_list_item">
									<a href="/faq" className="">
										FAQ
									</a>
								</li>
							</ul>
						</li>
						<li className="footer_main_lists">
							<h4 className="list_header">Socials</h4>
							<ul>
								<li className="footer_list_item">
									<a href="#" rel="noopener" target="_blank">
										Instagram
									</a>
								</li>
								<li className="footer_list_item">
									<a href="#" rel="noopener" target="_blank">
										Facebook
									</a>
								</li>
								<li className="footer_list_item">
									<a href="#" rel="noopener" target="_blank">
										Twitter
									</a>
								</li>
							</ul>
						</li>
						<li className="footer_main_lists">
							<h4 className="list_header">Legal</h4>
							<ul>
								<li className="footer_list_item">
									<a href="/terms" className="">
										Terms &amp; Conditions
									</a>
								</li>
								<li className="footer_list_item">
									<a href="/legals" className="">
										Privacy Policy
									</a>
								</li>
								<li className="footer_list_item">
									<a href="#" target="_blank" rel="noopener" download="">
										DDNA Press Kit (NL)
									</a>
								</li>
								<li className="footer_list_item">
									<a href="#" target="_blank" rel="noopener" download="">
										DDNA Press Kit
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
			</div>
			<div className="bottom ">
				<p className="small">Copyright 2024</p>
				<a
					href="https://wonderlandams.com/"
					target="_blank"
					rel="noopener"
					className="small">
					Web by wonderland
				</a>
			</div>
		</footer>
	);
};
export default Footer;
