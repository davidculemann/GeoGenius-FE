import styled from "styled-components";

const StyledFooter = styled.footer`
	position: absolute;
	bottom: 0;
	display: flex;
	align-items: center;
	gap: 1rem;
	color: #000;
	padding-bottom: 0.2rem;
	font-size: 1.4rem;
	a {
		color: var(--primary-green);
		text-decoration: none;
		margin-right: 0.4rem;
		&:hover {
			text-decoration: underline;
		}
	}
`;

//footer with links to my gmail (davidculemann@gmail.com)
function Footer() {
	return (
		<StyledFooter>
			<p>@2023 David Culemann</p>
			<span>
				<a
					href="https://www.linkedin.com/in/david-culemann/"
					target="_blank"
					rel="noreferrer"
				>
					LinkedIn
				</a>
				<i className="fa-brands fa-linkedin"></i>
			</span>
			<span>
				<a
					href="https://github.com/davidculemann/higher-lower_v2"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
				<i className="fa-brands fa-github"></i>
			</span>
			<span>
				<a href="mailto:davidculemann@gmail.com" aria-label="Email me">
					Contact me
				</a>
				<i className="fa-solid fa-envelope"></i>
			</span>
		</StyledFooter>
	);
}

export default Footer;
