import {
  Form,
  Card,
  Select,
  Stack,
  Table,
  TextInput,
  Title
} from "@airplane/views";
import airplane from "airplane";

const BirthdayCalendar = () => {
  return (
    <Stack>
      <Stack direction="row">
        <Title>Birthday Calendar</Title>
      </Stack>
      <Card>
        <Form task="add_employee" submitText="Add Employee" />
      </Card>
      <Table
        title="Birthdays"
        task="read_birthdays"
        columnsTransform={(cols) =>
          cols.map((c) => ({ ...c, label: c.label.charAt(0).toUpperCase()
  + c.label.slice(1) }))
        }
        outputTransform={(data) => data.map((d) => ({ ...d, birthday: new Date(d.birthday).toLocaleDateString() })) }
      />
    </Stack>
  );
};

export default airplane.view(
  {
    slug: "birthday_calendar",
    name: "Birthday Calendar",
  },
  BirthdayCalendar
);
