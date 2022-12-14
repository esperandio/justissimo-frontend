import swal from "sweetalert";

export default function AlertWarning(message) {
  return (
    swal({
      title: "Atenção!",
      text: message,
      icon: "warning",
      button: "OK",})
  );
}