const { Notification } = require('../../models')

class NotificationController {
   /**
   * @swagger
   * /notifications:
   *  get:
   *    tags:
   *      - Notifications
   *    description: Returns a list with all the notifications
   *    produces:
   *      - application/json
   *    responses:
   *      200:
   *        description: Successfully retrives the list of notifications
   *        schema:
   *          $ref: '#/components/schemas/BasicNotificationsModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                notifications:
   *                  type: array
   *                  items:
   *                    type: object
   *                    $ref: '#/components/schemas/BasicNotificationsModel'
   *      500:
   *        description: The server was unable to get the list of notifications
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async list (req, res) {
    const notifications = await Notification.findAll()

    if (!notifications) {
      return res.status(500).json({ message: 'Unable to get list of notifications' })
    }

    res.json({ notifications })
  }

  /**
   * @swagger
   * /notifications/{id}:
   *  get:
   *    tags:
   *      - Notifications
   *    description: Returns a specific notification queried by id
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      200:
   *        description: Successfully retrieves the notification queried
   *        schema:
   *          $ref: '#/components/schemas/BasicNotificationsModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                notification:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicNotificationsModel'
   *      404:
   *        description: The server was unable to find the notification
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async view (req, res) {
    const { id } = req.params
    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    res.json({ notification })
  }

  /**
   * @swagger
   * /notifications:
   *  post:
   *    tags:
   *      - Notifications
   *    description: Creates a notification instance
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              texto:
   *                type: string
   *              visualizado:
   *                type: boolean
   *    responses:
   *      201:
   *        description: Successfully creates a notification
   *        schema:
   *          $ref: '#/components/schemas/BasicNotificationModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                notification:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicNotificationModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to create the notification
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async create (req, res) {
    try {
      const notification = await Notification.create(req.body)

      if (!notification) {
        return res.status(500).json({ message: 'Unable to create notification' })
      }

      res.status(201).json({ notification: notification.returnObject() })
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'An account with the email informed already exists' })
    }
  }

  /**
   * @swagger
   * /notifications/{id}:
   *  put:
   *    tags:
   *      - Notifications
   *    description: Updates a notification instance
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    requestBody:
   *      content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              texto:
   *                type: string
   *              visualizado:
   *                type: boolean
   *    responses:
   *      200:
   *        description: Successfully updates a notification
   *        schema:
   *          $ref: '#/components/schemas/BasicNotificationModel'
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                notification:
   *                  type: object
   *                  $ref: '#/components/schemas/BasicNotificationModel'
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to update the notification
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async update (req, res) {
    const { id } = req.params

    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    const updated = await notification.update(req.body)

    if (!updated) {
      return res.status(500).json({ message: `Unable to update notification ${id}` })
    }

    const p = await Notification.findOne({ where: { id } })

    res.json({ notification: p })
  }

  /**
   * @swagger
   * /notifications/{id}:
   *  delete:
   *    tags:
   *      - Notifications
   *    description: Deletes a notification instance
   *    security:
   *      - bearerAuth: []
   *    produces:
   *      - application/json
   *    parameters:
   *      - name: id
   *        in: path
   *        schema:
   *          type: integer
   *        required: true
   *    responses:
   *      200:
   *        description: Successfully deletes the notification
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      401:
   *        description: Authorization information is missing or invalid.
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      403:
   *        description: You don't have the required permissions to do this request
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   *      500:
   *        description: The sever was unable to delete the notification
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  async delete (req, res) {
    const { id } = req.params

    const notification = await Notification.findOne({ where: { id } })

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' })
    }

    const deleted = await notification.destroy()

    if (!deleted) {
      return res.status(500).json({ message: 'Unable to delete the notification' })
    }

    res.json({ message: 'Notification deleted successfully!' })
  }
}

module.exports = new NotificationController()
