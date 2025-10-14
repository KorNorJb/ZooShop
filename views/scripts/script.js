document.addEventListener('DOMContentLoaded', () => {
    // Modal window for authorization
    let openModalSignUp = document.querySelector(".button__signIn");
    let modalContainerSignUp = document.querySelector(".Authmodal__block");

    if (openModalSignUp && modalContainerSignUp) {
        openModalSignUp.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainerSignUp.classList.add('show');
        });

        modalContainerSignUp.addEventListener('click', (e) => {
            if (e.target === modalContainerSignUp) {
                e.preventDefault();
                modalContainerSignUp.classList.remove('show');
            }
        });
    }

    // Modal window for registration
    let openModalSignIn = document.querySelector(".button__signUp");
    let modalContainerSignIn = document.querySelector(".Regmodal__block");

    if (openModalSignIn && modalContainerSignIn) {
        openModalSignIn.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainerSignIn.classList.add('show');
        });

        modalContainerSignIn.addEventListener('click', (e) => {
            if (e.target === modalContainerSignIn) {
                e.preventDefault();
                modalContainerSignIn.classList.remove('show');
            }
        });
    }

    // Switch between modals
    let alreadyHave = document.querySelector(".alredyHave");
    let dontHave = document.querySelector(".DontHave");

    if (alreadyHave && modalContainerSignIn && modalContainerSignUp) {
        alreadyHave.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainerSignIn.classList.remove('show');
            modalContainerSignUp.classList.add('show');
        });
    }

    if (dontHave && modalContainerSignIn && modalContainerSignUp) {
        dontHave.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainerSignIn.classList.add('show');
            modalContainerSignUp.classList.remove('show');
        });
    }

    // Profile modal window
    let openModalProf = document.querySelector(".profileImage");
    let modalContainerProf = document.querySelector(".Profile__block");

    if (openModalProf && modalContainerProf) {
        openModalProf.addEventListener('click', (e) => {
            e.preventDefault();
            modalContainerProf.classList.add('show');
        });

        modalContainerProf.addEventListener('click', (e) => {
            if (e.target === modalContainerProf) {
                e.preventDefault();
                modalContainerProf.classList.remove('show');
            }
        });
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const token = getCookie('accessToken');

    if (token) {
        console.log('Token found:', token);
        try {
            const decoded = jwt_decode(token);
            console.log('Decoded token:', decoded);

            const usernameElement = document.querySelector('.modal__inf .username');
            const phoneElement = document.querySelector('.modal__inf .phone');
            const emailElement = document.querySelector('.modal__inf .email');

            if (usernameElement && phoneElement && emailElement) {
                usernameElement.textContent = `Username: ${decoded.username}`;
                phoneElement.textContent = `Phone: ${decoded.phone}`;
                emailElement.textContent = `Email: ${decoded.email}`;
            } else {
                console.error('Profile elements not found');
            }
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    } else {
        console.error('Token not found');
    }
});