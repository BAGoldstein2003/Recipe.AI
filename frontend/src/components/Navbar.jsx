import './Navbar.css'

export default function Navbar() {
    return (
        <>
        <nav className="navbar">
            <a href="/"><img className="navbar-logo" src="../../logo.png" alt="HomePage" /></a>

            <div className="navbar-links">
                <a className="link" href="/">Get Started</a>
                <a className="link" href="/my-recipes">My Recipes</a>
            </div>
        </nav>
        </>
    );
}