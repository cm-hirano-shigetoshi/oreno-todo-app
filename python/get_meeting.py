import json
import sys

from google_calendar_utils.calendar import Calendar

calendar_id = "main"
from_date = sys.argv[1]
to_date = sys.argv[2] if len(sys.argv) >= 3 else None

calendar = Calendar()
events = calendar.collect_events_by_jst_date(calendar_id, from_date, to_date=to_date)
print(json.dumps(events))
