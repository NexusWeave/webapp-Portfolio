#   Standard libraries
import __future__
from datetime import datetime

class AnnouncementsService(object):
    __VERSION__ = "v1.0.0"

    @staticmethod
    def get_celebration_days(date: datetime) -> str | None:
        match (date):

            case _ if date.month == 2 and date.day > 9 and date.day < 15:
                message ="💖 Happy Valentines Day 💖"

            case _ if date.month == 2 and date.day == 25:
                message ="🎂 Happy Birthday @krigjo25 🎁"

            case _ if date.month == 5 and date.day < 18 and date.month == 5 and date.day > 9:
                message ="🇳🇴 Happy Independence Day Norway 🇳🇴"

            case _ if date.month > 9 and date.day > 20 and date.month < 12 and date.day < 1:
                message ="👻 Happy Halloween 👻"

            case _ if date.month == 12 and date.day > 10 and date.day < 26:
                message ="🎅 Merry Christmas ! 🎅"

            case _ if date.month > 11 and date.day >= 30 and date.month  < 2 and date.day < 10:
                message ="🎉 Happy New Year 🎉"

            case _: 
                message = "No announcements for today."

        return message