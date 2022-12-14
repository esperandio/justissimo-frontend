import swal from "sweetalert";

export default function AlertInfo(message) {
  return (
    swal({
      title: "Info!",
      text: message,
      icon: "info",
      button: "OK",})
  );
}