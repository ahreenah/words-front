import Chart from 'react-apexcharts'

export default function({learned,inProgress,pending}){
    let options= {
        labels:['learned', 'in propgress', 'not started to learn'],
      },
      series= [learned, inProgress, pending],
      fill= {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      };
    return <Chart options={options} series={series} fill={fill} type="pie" width={500} height={200} />
}