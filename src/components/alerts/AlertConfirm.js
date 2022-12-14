import swal from "sweetalert";

export default function AlertConfirm(message) {
  return (
    swal({
      title: "Confirmação!",
      text: message,
      icon: "info",
      buttons: ["Cancelar", "OK"],})
  );
}