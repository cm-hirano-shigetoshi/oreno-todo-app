import { memo, FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const data = [
  {
    name: "",
    uuu: 3.2,
    sss: 2.5,
    hhh: 0.5,
  },
];

type Props = {
  hoge: string;
};

export const AccumulatedTime: FC<Props> = memo((props) => {
  const { hoge } = props;
  return (
    <ResponsiveContainer>
      <BarChart layout="vertical" data={data}>
        <XAxis
          type="number"
          ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />
        <YAxis dataKey="name" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="uuu" stackId="a" fill="#8884d8" />
        <Bar dataKey="sss" stackId="a" fill="#82ca9d" />
        <Bar dataKey="hhh" stackId="a" fill="#74ca1d" />
        <ReferenceLine x={10} stroke="red" strokeWidth={2} />
      </BarChart>
    </ResponsiveContainer>
  );
});
