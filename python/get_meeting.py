import json

from google_calendar_utils.calendar import Calendar

calendar_id = "main"
from_date = "2024-10-11"

calendar = Calendar()
events = calendar.collect_events_by_jst_date(calendar_id, from_date, to_date=None)
print(json.dumps(events))
