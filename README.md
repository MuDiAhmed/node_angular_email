## **Requirements:**

1. Docker
2. Mailgun SMTP account

## **Run**

1. Open terminal
2. Run `cd <path/to/project>`
3. Run `docker build -f DockerFile -t send-email .`
4. Run `docker run -p 4300:4300 -e SMTP_API_KEY=<MailGun_API_KEY> -e SMTP_DOMAIN=<MailGun_DOMAIN> send-email`
