import { createClient} from "redis";
import { downloadS3Folder , copyFinalDist } from "./aws.js";
import { buildProject } from "./utils.js";
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main(){
    while(1){
        const response = await subscriber.brPop(
            // commandOptions({ isolated: true }),
            'build-key',
            0,
        );
        console.log(response);
        const id = response.element;
        await downloadS3Folder(`output/${id}`);
        await buildProject(id);
        await copyFinalDist(id);
        publisher.hSet("status",id,"deployed");
    }
}

main();
