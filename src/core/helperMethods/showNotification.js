// showNotification helper function
import { notifications } from "@mantine/notifications";

export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
};
export const showNotification = (message, type) => {
  notifications.show({
    message,
    color: getNotificationColor(type),
  });

  function getNotificationColor(type) {
    switch (type) {
      case NOTIFICATION_TYPES.SUCCESS:
        return "green";
      case NOTIFICATION_TYPES.ERROR:
        return "red";
      case NOTIFICATION_TYPES.WARNING:
        return "yellow";
      case NOTIFICATION_TYPES.INFO:
        return "blue";
      default:
        return "green";
    }
  }
};
