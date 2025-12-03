import { TAG_CONFIG, Tag } from "@/lib/tags";
import {Badge} from "@/components/ui/badge";

export function TagPill({ tag }: { tag: Tag }) {
    const config = TAG_CONFIG[tag];

    return (
        <Badge className={`border ${config.borderColor} ${config.color} ${config.textColor}`}>
            {tag}
        </Badge>
    );
}
