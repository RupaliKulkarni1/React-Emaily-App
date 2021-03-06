const sendGrid = require('sendgrid');
const helper = sendGrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {

    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendGrid(keys.sendGridKey);
        this.from_email = new helper.Email('rupali.kulkrni@gmail.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addrecipients();
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addrecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recepient => {
            personalize.addTo(recepient);
        })
        this.addPersonalization(personalize);
    }

    async send() {
        const request = await this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = this.sgApi.API(request);
        return response;
    }

}

module.exports = Mailer;