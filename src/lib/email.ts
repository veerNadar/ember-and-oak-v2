import { Resend } from "resend";
import type { Reservation } from "@/lib/types";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
    const [year, month, day] = dateStr.split("-").map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatTime(timeStr: string): string {
    const [hourStr, minuteStr] = timeStr.split(":");
    const hour = Number(hourStr);
    const minute = minuteStr ?? "00";
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:${minute} ${period}`;
}

// ── Owner notification ───────────────────────────────────────────────────────

export async function sendOwnerNotification(reservation: Reservation) {
    const ownerEmail = process.env.OWNER_EMAIL;
    if (!ownerEmail) {
        console.warn("[email] OWNER_EMAIL is not set — skipping owner notification");
        return;
    }

    const formattedDate = formatDate(reservation.date);
    const formattedTime = formatTime(reservation.time);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Reservation Request</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1a1a1a;border-radius:12px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.5);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#C8692A 0%,#a85220 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Ember &amp; Oak</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.2;">New Reservation Request</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.6;">
                A new reservation request has been submitted. Review the details below and confirm or update its status in the admin panel.
              </p>

              <!-- Details card -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#242424;border-radius:10px;overflow:hidden;margin-bottom:28px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 18px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8692A;font-weight:600;">Guest Information</p>
                    ${row("Name", reservation.customer_name)}
                    ${row("Phone", reservation.phone)}
                    ${reservation.email ? row("Email", reservation.email) : ""}
                  </td>
                </tr>
                <tr>
                  <td style="height:1px;background:#333;"></td>
                </tr>
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 18px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8692A;font-weight:600;">Booking Details</p>
                    ${row("Date", formattedDate)}
                    ${row("Time", formattedTime)}
                    ${row("Party Size", `${reservation.party_size} ${reservation.party_size === 1 ? "guest" : "guests"}`)}
                    ${reservation.notes ? row("Notes", reservation.notes) : ""}
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://ember-and-oak-v2-bcha.vercel.app/admin/login"
                       style="display:inline-block;background:#C8692A;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:8px;letter-spacing:0.5px;">
                      Open Admin Panel &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0;font-size:12px;color:#555555;">Ember &amp; Oak &bull; 1234 South Congress Ave, Austin, TX 78704</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    try {
        await resend.emails.send({
            from: "Ember & Oak <reservations@resend.dev>",
            to: ownerEmail,
            subject: `New Reservation Request – ${reservation.customer_name} for ${formattedDate}`,
            html,
        });
    } catch (err) {
        console.error("[email] Failed to send owner notification:", err);
    }
}

// ── Customer confirmation ────────────────────────────────────────────────────

export async function sendCustomerConfirmation(reservation: Reservation) {
    if (!reservation.email) {
        // No customer email provided — silently skip
        return;
    }

    const formattedDate = formatDate(reservation.date);
    const formattedTime = formatTime(reservation.time);

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reservation Request Received</title>
</head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#1a1a1a;border-radius:12px;overflow:hidden;box-shadow:0 4px 30px rgba(0,0,0,0.5);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#C8692A 0%,#a85220 100%);padding:40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Ember &amp; Oak</p>
              <h1 style="margin:0 0 8px;font-size:28px;font-weight:700;color:#ffffff;">Request Received!</h1>
              <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.85);">We're looking forward to hosting you.</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:36px 40px 0;">
              <p style="margin:0;font-size:16px;color:#dddddd;line-height:1.7;">
                Hi <strong style="color:#ffffff;">${reservation.customer_name}</strong>,<br /><br />
                Thank you for choosing Ember &amp; Oak. We've received your reservation request and our team will confirm your booking within <strong style="color:#C8692A;">2 hours</strong>.
              </p>
            </td>
          </tr>

          <!-- Booking summary card -->
          <tr>
            <td style="padding:28px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#242424;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 20px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8692A;font-weight:600;">Your Booking Details</p>

                    <!-- Date row -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="20" valign="top" style="padding-top:1px;">
                          <span style="font-size:16px;">📅</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Date</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:500;">${formattedDate}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Time row -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                      <tr>
                        <td width="20" valign="top" style="padding-top:1px;">
                          <span style="font-size:16px;">🕐</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Time</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:500;">${formattedTime}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Party size row -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="20" valign="top" style="padding-top:1px;">
                          <span style="font-size:16px;">👥</span>
                        </td>
                        <td style="padding-left:10px;">
                          <p style="margin:0;font-size:12px;color:#888;text-transform:uppercase;letter-spacing:1px;">Party Size</p>
                          <p style="margin:4px 0 0;font-size:15px;color:#ffffff;font-weight:500;">${reservation.party_size} ${reservation.party_size === 1 ? "guest" : "guests"}</p>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Notice -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#1f1812;border:1px solid #5a3010;border-radius:8px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0;font-size:14px;color:#ddbb99;line-height:1.6;">
                      ⏳ <strong>We'll confirm your reservation within 2 hours.</strong> If you need to make changes or have questions, please call us directly.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact / Location -->
          <tr>
            <td style="padding:0 40px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#242424;border-radius:10px;">
                <tr>
                  <td style="padding:24px 28px;">
                    <p style="margin:0 0 16px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C8692A;font-weight:600;">Find Us</p>
                    <p style="margin:0 0 6px;font-size:14px;color:#cccccc;">📍 1234 South Congress Ave, Austin, TX 78704</p>
                    <p style="margin:0;font-size:14px;color:#cccccc;">📞 <a href="tel:+15125550192" style="color:#C8692A;text-decoration:none;">(512) 555-0192</a></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px;border-top:1px solid #2a2a2a;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#555555;">Ember &amp; Oak &bull; Austin, TX</p>
              <p style="margin:0;font-size:12px;color:#444444;">You're receiving this because you submitted a reservation request on our website.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

    try {
        await resend.emails.send({
            from: "Ember & Oak <reservations@resend.dev>",
            to: reservation.email,
            subject: "Reservation Request Received – Ember & Oak",
            html,
        });
    } catch (err) {
        console.error("[email] Failed to send customer confirmation:", err);
    }
}

// ── Internal helper: table row ───────────────────────────────────────────────

function row(label: string, value: string): string {
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
      <tr>
        <td style="font-size:12px;color:#777;text-transform:uppercase;letter-spacing:1px;width:100px;vertical-align:top;padding-top:2px;">${label}</td>
        <td style="font-size:15px;color:#dddddd;font-weight:500;">${value}</td>
      </tr>
    </table>
  `;
}
