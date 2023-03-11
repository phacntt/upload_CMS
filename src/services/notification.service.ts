import { context } from "../types/context.type";
import { CreateNotificationDto } from "../dto/notification.dto";


class NotificationService {
    public clients = context
    public DEFAULT_PAGE = 1;
    public DEFAULT_LIMIT = 10;

    public async listNotifications() {
        const notifications = await this.clients.prisma.notification.findMany()

        return notifications;
    }

    public async notificationById(id: number) {
        const notificationById = await this.clients.prisma.notification.findFirst({ where: { id } })
        return notificationById;
    }

    public async createNotification(notification: CreateNotificationDto) {

        const newNotification = await this.clients.prisma.notification.create({ data: notification })

        return newNotification
    }
}

export default NotificationService