import toastr from "toastr";
import "toastr/build/toastr.min.js";
import "toastr/build/toastr.css";


toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: true,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
};

export function showMessage(type, title, message) {
    toastr[type](message, title);
}

export function showSuccessMessage(title, message) {
    showMessage("success", title ? title : "Sucesso" , message);
}

export function showInfoMessage(title, message) {
    showMessage("info", title ? title : "Informação", message);
}

export function showWarningMessage(title, message) {
    showMessage("warning", title ? title : "Alerta", message);
}

export function showErrorMessage(title, message) {
    showMessage("error", title ? title : "Erro", message);
}
