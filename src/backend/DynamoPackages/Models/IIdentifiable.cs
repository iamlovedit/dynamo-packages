using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace DynamoPackages.Models;

public interface IIdentifiable<TKey> where TKey : IEquatable<TKey>
{
    [BsonId] [JsonProperty("_id")] TKey Id { get; set; }
    string Name { get; set; }
}