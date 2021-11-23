// add login
const modal = document.getElementById('modal')
const nombreUsuario = document.getElementById('nombre-usuario')
let loginForms,c

const login = {
    innerLogin(pay){
        modal.innerHTML = " "
        modal.innerHTML = `
        <div class="button-box">
            <div id="btn" id="btn-active-login"></div>
            <button id="btn-iniciar" type="button" class="toggle-btn">Iniciar Sesión</button>
            <button id="btn-registrar" type="button" class="toggle-btn">Registrar</button>
        </div>
        <div id="login-forms" class="login-forms-login">
            <form id="login" class="input-group">
                <input id="correo" type="email" class="input-field" placeholder="Correo electrónico" required>
                <input id="contrase_a" type="password" class="input-field" placeholder="Contraseña" required>
                <div class="checkbox">
                    
                    <input type="checkbox"/>
                    <label>Recordar Contraseña</label>
                </div>
                <button type="button" class="submit-btn" id="iniciar-sesion">Iniciar Sesión</button>
            </form>
            <form id="registro" class="input-group">
                <input type="text" class="input-field" placeholder="Nombre(s)" required>
                <input type="text" class="input-field" placeholder="Apellidos" required>
                <input type="tel" class="input-field" placeholder="Telefono" required>
                <input type="email" class="input-field" placeholder="Correo Electrónico" required>
                <input type="password" class="input-field" placeholder="Contraseña" required>
                <input type="password" class="input-field" placeholder="Confirmar Contraseña" required>
                <input type="checkbox" id="check-registro" class="checkbox"><label>Acepto los terminos y condiciones</label>
                <button type="submit" class="submit-btn" id="registrar-usuario">Registrar</button>
            </form>
        </div>
        <span id="error"></span>
        `
        c = document.getElementById('btn')
        loginForms = document.getElementById('login-forms')
        // open login
        let btnLogin = document.getElementById('btn-login')

        btnLogin.addEventListener('click', () => {
            this.viewModal(true)
        })

        // inico de sesion 
        let iniciarSesion = document.getElementById('iniciar-sesion')
        iniciarSesion.addEventListener('click', () => {
            this.login(pay)
        })

        // evento login/registro
        let btnIniciar = document.getElementById('btn-iniciar') // iniciar sesion formulario (arriba)
        let btnRegistrar = document.getElementById('btn-registrar') // registrar formulario

        btnIniciar.addEventListener('click', () => {
            this.inicio();
        })
        btnRegistrar.addEventListener('click', () => {
            this.registro();
        })
        return true
    },
    innerPay: () => {
        modal.innerHTML = " "
        modal.innerHTML = `
        <form class="form">
            <div class="header">
                Introduzca Datos del Contacto
                <div class="division-modal"></div>
            </div>
            <div class="element">
                <span class="info-apartado"> </span>
            </div>
            <div class="element">
                <label>¿Desea dar un enganche?</label>
                <input type="checkbox" id="checkEnganche" onclick="MostrarDiv(this)">
            </div>
            <div class="element" id="mostrarEnganche" style="display: none;">
                <select name="monto-enganche" id="monto-enganche">
                    <option value="0" disabled selected> Seleccione Monto de Enganche </option>
                    <option value="1" >$ 100.00 DLLS</option>
                    <option value="2" >$ 200.00 DLLS</option>
                    <option value="3" >$ 300.00 DLLS</option>
                    <option value="4" >$ 400.00 DLLS</option>
                </select>
            </div>
            <div class="element"> 
                <select name="monto-pago" id="monto-pago" >
                    <option value="0" disabled selected> Seleccione Monto de Apartado </option>
                    <option value="1" >$ 50.00 DLLS</option>
                    <option value="2" >$ 100.00 DLLS</option>
                    <option value="3" >$ 150.00 DLLS</option>
                    <option value="4" >$ 200.00 DLLS</option>
                </select>
            </div>              
                <div class="element">                          
                    <button type="submit" id="btn-enviar" class="enviar">Enviar</button>
                </div>
                <div class="element">
                    <button type="submit" id="btn-cancelar" class="cancelar">Cancelar</button>
                </div>
        </form>
        `
        return true
    },
    viewModal: (view) => {
        let modal = document.getElementById('container-modal')
        if(view){
            modal.style.display = "flex"
        }else{
            modal.style.display = "none"
        }
        
    },
    registro: () =>{
        c.style.left = '140px'
        loginForms.classList = "login-forms-register"
    },
    inicio: () =>{
        c.style.left = '0px';
        loginForms.classList = "login-forms-login"
    },
    login(pay){

        let email = document.getElementById('correo')
        let password = document.getElementById('contrase_a')

        let body = {
            email: email.value,
            password: password.value
        }
    
        fetch("/server/ecommerce/auth/sign-in",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        .then(data => data.json())
        .then(res => {
            if(res.code != 0) {
                console.log("No Login !!")
                email.value = " "
                password.value = " "
                Msg.innerText = "Usuario y/o contraseña incorrectos";
                Msg.style.display = "block";
                return false
            }else{
                this.iniciar(pay)
                document.getElementById('')
                return true  
            }
        })

    },
    logout(){
        const loagout = fetch("/server/ecommerce/auth/sign-out",{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(loagout)
        sessionStorage.removeItem("usuario")
        sessionStorage.removeItem("correo")
        sessionStorage.removeItem("sesion")
        this.innerLogin();
        this.mostrarBoton()
    },
    iniciar(pay){
        sessionStorage.setItem("usuario", "Fernanda")
        sessionStorage.setItem("correo", document.getElementById('correo').value)
        sessionStorage.setItem("sesion", true)
        this.viewModal();
        if(pay) this.innerPay();
        this.mostrarBoton()
    },
    mostrarBoton: () =>{
        let btnLogin = document.getElementById('btn-login')
        let btnLogout = document.getElementById('btn-logout')
        if(sessionStorage.getItem("sesion") == null)
        {
            btnLogout.style.display = "none"
            btnLogin.style.display = "block"
            nombreUsuario.innerText = " "
        }

        if(sessionStorage.getItem("sesion"))
        {
            btnLogout.style.display = "block"
            btnLogin.style.display = "none"
            nombreUsuario.innerText = "Bienvenido(a): "+ sessionStorage.getItem('usuario')
        }
    }
}

export default login



